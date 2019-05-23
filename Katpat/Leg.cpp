/*
  Leg.cpp - Library that defines a leg of Katpat.
  Created by klem on 17/05/2019
*/

#include "Arduino.h"
#include <Adafruit_PWMServoDriver.h>
#include "ServoController.h"
#include "Leg.h"

Leg::Leg()
{
  _coxalServo = ServoController();
  _femurServo = ServoController();
  _tibiaServo = ServoController();
}

void Leg::attachPins(uint8_t coxalPin, uint8_t femurPin, uint8_t tibiaPin, Adafruit_PWMServoDriver pwm, bool reversed = false)
{
  _coxalServo.setPin(coxalPin, pwm, reversed);
  _femurServo.setPin(femurPin, pwm, reversed);
  _tibiaServo.setPin(tibiaPin, pwm, reversed);
}

void Leg::initialize(uint16_t minPulses[], uint16_t maxPulses[])
{
  _coxalServo.initialize(0, 90, minPulses[0], maxPulses[0]);
  delay(30);
  _femurServo.initialize(0, 180, minPulses[1], maxPulses[1]);
  delay(30);
  _tibiaServo.initialize(0, 180, minPulses[2], maxPulses[2]);
}

ServoController* Leg::getCoxalServo()
{
  return &_coxalServo;
}

ServoController* Leg::getFemurServo()
{
  return &_femurServo;
}

ServoController* Leg::getTibiaServo()
{
  return &_tibiaServo;
}

ServoController* Leg::getServoByIndex(uint8_t index)
{
  switch (index) {
    case 1: return &_femurServo;
    case 2: return &_tibiaServo;
    default: return &_coxalServo;
  }
}
