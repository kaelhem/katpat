/*
 * Katpat v0.1.0
 * A bluetooth driven bot with 4 legs.
 * Created by klem on 17/05/2019
 * 
 * Hardware parts:
 *   + Arduino UNO
 *   + Adafruit 16-Channel 12-bit PWM/Servo Shield - I2C interface
 *   + HM-10 bluetooth module
 *   + 12 sg90 micro servos (180°)
 *
 * The HM-10 module is plugged like this:
 *   + BT VCC to Arduino 5V out. 
 *   + BT GND to GND
 *   + Arduino D8 (ASS RX) - BT TX no need voltage divider 
 *   + Arduino D9 (ASS TX) - BT RX through a voltage divider
 * (more info : http://www.martyncurrey.com/hm-10-bluetooth-4ble-modules/)
 *
 */
 
#include <AltSoftSerial.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "Leg.h"
#include "ServoController.h"
#include "CalibrationUtils.h"

AltSoftSerial BTSerial;

// called this way, it uses the default address 0x40
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

const Leg legs[4];

CalibrationUtils calibrationUtils;

void setup() 
{
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  Serial.print("Sketch:   ");   Serial.println(__FILE__);
  Serial.print("Uploaded: ");   Serial.println(__DATE__);
  Serial.println(" ");

  BTSerial.begin(9600);
  Serial.println("BTserial started at 9600");
  Serial.println(" ");

  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates

  legs[0].attachPins(0, 1, 2, pwm); // leg #1 - Front Left
  legs[1].attachPins(4, 5, 6, pwm, true); // leg #2 - Front Right
  legs[2].attachPins(8, 9, 10, pwm); // leg #3 - Back Right
  legs[3].attachPins(12, 13, 14, pwm, true); // leg #4 - Back Left
}

/*
 * Allow to initialize legs with calibration data saved in EEPROM.
 * 
 * This command will match: INIT
 */
void initCommand() {
  Serial.println("> initialize legs");
  CalibrationObject calibration = calibrationUtils.loadCalibration();
  for (uint8_t i = 0; i < 4; i++) {
    legs[i].initialize(calibration.minPulses[i], calibration.maxPulses[i]);
    delay(100);
  }
}

/*
 * Allow to save the calibration in EEPROM.
 * 
 * This command will match: SAVE
 */
void saveCommand() {
  Serial.println("> save servos calibration in EEPROM");
  calibrationUtils.saveCalibration(legs);
}

/*
 * Allow to retrieve the calibration in EEPROM via the Bluetooth serial port
 * Will stream 20 bytes len buffer following the scheme below:
 * START{data}{data length}DONE
 * 
 * {data} will contains calibrations saved on eeprom. It iterates over all
 * legs, and all servos.
 * The order of legs is: FL, FR, BR, BL.
 * The order of servos is: coxal, femur, tibia. 
 * 
 * The scheme will be (with final ";"):
 * {min_pulse_leg#0_servo#0},{max_pulse_leg#0_servo#0};{min_pulse_leg#0_servo#1},{max_pulse_leg#0_servo#1};...
 * 
 * minPulse / maxPulse values are uint16.
 * 
 * {data length} is the length of data, added to perform integrity check.
 * 
 * This command will match: LOAD
 */
void loadCommand(String commandName) {
  CalibrationObject calibration = calibrationUtils.loadCalibration();
  String strValues = String();
  for (uint8_t i = 0; i < 4; i++) {
    for (uint8_t j = 0; j < 3; j++) {
      strValues += String(calibration.minPulses[i][j]) + "," + String(calibration.maxPulses[i][j]) + ";";
    }
  }
  int len = strValues.length();
  strValues += String(len);
  len = strValues.length();
  
  String chars = "";
  short charIndex = 0;
  BTSerial.print("START");
  for (short i = 0; i < len; ++i) {
    chars += strValues.charAt(i);
    if (++charIndex == 20) {
      charIndex = 0;
      BTSerial.print(chars);
      chars = "";
    }
  }
  if (chars.length() > 0) {
    BTSerial.print(chars);
  }
  BTSerial.print("DONE");
}

/*
 * Allow to rotate a unique servo to its min angle.
 * 
 * This command will match: GOMIN{legId}{servoId}
 */
void goMinCommand(String commandName) {
  uint8_t legId = commandName.charAt(5) - 48;
  uint8_t servoId = commandName.charAt(6) - 48;
  if (legId >= 0 && legId < 4) {
    ServoController *servo = legs[legId].getServoByIndex(servoId);
    Serial.println("> move servo#" + String(servo->getPin()) + " to min angle (" + String(servo->getMinAngle()) + ")");
    servo->rotate(servo->getMinAngle(), 0);
  }
}

/*
 * Allow to rotate a unique servo to its max angle.
 * 
 * This command will match: GOMAX{legId}{servoId}
 */
void goMaxCommand(String commandName) {
  uint8_t legId = commandName.charAt(5) - 48;
  uint8_t servoId = commandName.charAt(6) - 48;
  if (legId >= 0 && legId < 4) {
    ServoController *servo = legs[legId].getServoByIndex(servoId);
    Serial.println("> move servo#" + String(servo->getPin()) + " to max angle (" + String(servo->getMaxAngle()) + ")");
    servo->rotate(servo->getMaxAngle(), 0);
  }
}

/*
 * Allow to rotate a unique servo to the given angle.
 * 
 * This command will match: MOVE{legId}{servoId}{angle}[T{timer}]
 * legId: which leg (0=front left, 1=front right, 2=back right, 3=back left)
 * servoId: which servo in the leg (0=coxal, 1=femur, 2=tibia)
 * angle: rotation value between 0 and 180 (3 chars max.)
 * timer: [optional] delay between each pulse - max is 127 (default is 0)
 */
void moveCommand(String commandName) {
  uint8_t legId = commandName.charAt(4) - 48;
  uint8_t servoId = commandName.charAt(5) - 48;
  uint16_t moveTo = commandName.substring(6).toInt();
  long rawTimer = commandName.substring(6 + String(moveTo).length() + 1).toInt();
  uint8_t timer = constrain(rawTimer, 0, 127);
  if (legId >= 0 && legId < 4 && moveTo >= 0) {
    ServoController *servo = legs[legId].getServoByIndex(servoId);
    Serial.println("> move servo#" + String(servo->getPin()) + " to " + String(moveTo));
    servo->rotate(moveTo, 0);
  } else {
    Serial.println("> command is incorrect, format for moving servo should be: MOVE{legId}{servoId}{angle}[T{timer}]");
  }
}

/*
 * Allow to update the minPulse/maxPulse values of a unique servo.
 * 
 * This command will match: CALI{legId}{servoId}{kindPulse}{kindOffset}[{valueOffset}]
 * legId: which leg (0=front left, 1=front right, 2=back right, 3=back left)
 * servoId: which servo in the leg (0=coxal, 1=femur, 2=tibia)
 * kindPulse: 0 for minPulse, 1 for maxPulse (1 char)
 * kindOffset: 0 for decrease, 1 for increase (1 char)
 * valueOffset: [optional] offset value between 1 and 100 (default value is 1)
 */
void calibrateCommand(String commandName) {
  uint8_t legId = commandName.charAt(4) - 48;
  uint8_t servoId = commandName.charAt(5) - 48;
  bool isMaxPulse = commandName.charAt(6) == '1'; // 0 = minPulse, 1 = maxPulse
  bool shouldIncrease = commandName.charAt(7) == '1'; // 0 = decrease, 1 = increase
  uint8_t offset = 1;
  if (commandName.length() > 8) {
    uint8_t givenOffset = commandName.substring(8).toInt();
    offset = constrain(givenOffset, 1, 100);
  }
  if (legId >= 0 && legId < 4) {
     ServoController *servo = legs[legId].getServoByIndex(servoId);
     if (servo->isReversed())  {
       isMaxPulse = !isMaxPulse;
     }
     String kindPulse = isMaxPulse ? "maxPulse" : "minPulse";
     String kindOffset = shouldIncrease ? "increase" : "decrease";
     Serial.println("> calibrate servo#" + String(servo->getPin()) + ": " + kindOffset + " " + kindPulse + " (" + String(offset) + ")");
     if (isMaxPulse) {
       if (shouldIncrease) {
         servo->increaseMaxPulse(offset);
       } else {
         servo->decreaseMaxPulse(offset);
       }
     } else {
       if (shouldIncrease) {
         servo->increaseMinPulse(offset);
       } else {
         servo->decreaseMinPulse(offset);
       }
     }
  } else {
    Serial.println("> command is incorrect, format for calibrating servo should be: CALI{legId}{servoId}{kindPulse}{kindOffset}[{valueOffset}]");
  }
}

void execBtCommand(String commandName) {
  Serial.println("> Execute command: " + commandName);
  if (commandName == "INIT") {
    initCommand();
  } else if (commandName == "SAVE") {
    saveCommand();
  } else if (commandName.startsWith("LOAD")) {
    loadCommand(commandName);
  } else if (commandName.startsWith("GOMIN")) {
    goMinCommand(commandName);
  } else if (commandName.startsWith("GOMAX")) {
    goMaxCommand(commandName);
  } else if (commandName.startsWith("MOVE")) {
    moveCommand(commandName);
  } else if (commandName.startsWith("CALI")) {
    calibrateCommand(commandName);
  } else {
    Serial.println("> command is unknown, ignored");
  } 
}

bool isGettingCommand = false;
String command = "";
char receivedCharacter = ' ';
boolean RC = true;

void loop()
{
  // Read from the Bluetooth module and send to the Arduino Serial Monitor
  if (BTSerial.available()) {
    receivedCharacter = BTSerial.read();
    Serial.write(receivedCharacter);
    if (receivedCharacter == '/') {
      isGettingCommand = !isGettingCommand;
    } else if (isGettingCommand && receivedCharacter) {
      command.concat(receivedCharacter);
    }
    if (!isGettingCommand && command.length() > 0) {
      execBtCommand(command);
      command = "";
    }
  }

  // Read from the Serial Monitor and send to the Bluetooth module
  if (Serial.available())
  {
      receivedCharacter = Serial.read();
      // do not send line end characters to the HM-10
      if (receivedCharacter != 10 && receivedCharacter != 13 ) {  
        BTSerial.write(receivedCharacter);
      }
      // Echo the user input to the main window. 
      // If there is a new line print the ">" character.
      if (RC) {
        Serial.print("\r\n>");
        RC = false;
      }
      Serial.write(receivedCharacter);
      if (receivedCharacter == 10) {
        RC = true;
      }
  }
}
