/*
  Leg.h - Library that defines a leg of Katpat.
  Created by klem on 17/05/2019
*/
#ifndef Leg_h
#define Leg_h

#include "Arduino.h"
#include <Adafruit_PWMServoDriver.h>
#include "ServoController.h"
#include "Leg.h"

class Leg
{
  public:
    Leg();
    void attachPins(uint8_t coxalPin, uint8_t femurPin, uint8_t tibiaPin, Adafruit_PWMServoDriver pwm, bool reversed = false);
    void initialize(uint16_t minPulses[], uint16_t maxPulses[]);
    ServoController* getCoxalServo();
    ServoController* getFemurServo();
    ServoController* getTibiaServo();
    ServoController* getServoByIndex(uint8_t index);
  private:
    ServoController _coxalServo;
    ServoController _femurServo;
    ServoController _tibiaServo;
};

#endif
