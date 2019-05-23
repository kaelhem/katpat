/*
  ServoController.h - Library for manipulating servos of Katpat.
  Created by klem on 17/05/2019
*/
#ifndef ServoController_h
#define ServoController_h

#include "Arduino.h"
#include <Adafruit_PWMServoDriver.h>

class ServoController
{
  public:
    ServoController();
    void setPin(uint8_t pin, Adafruit_PWMServoDriver pwm, bool reversed = false);
    void initialize(uint8_t minAngle, uint8_t maxAngle, uint16_t minPulse, uint16_t maxPulse, uint8_t defaultPosition = 0);
    void increaseMinPulse(uint8_t pulse = 1);
    void decreaseMinPulse(uint8_t pulse = 1);
    void increaseMaxPulse(uint8_t pulse = 1);
    void decreaseMaxPulse(uint8_t pulse = 1);
    void rotate(uint8_t angle, uint8_t timer = 0);
    uint8_t getPin();
    uint16_t getMinPulse();
    uint16_t getMaxPulse();
    uint8_t getMinAngle();
    uint8_t getMaxAngle();
    uint8_t getPosition();
    bool isReversed();
  private:
    Adafruit_PWMServoDriver _pwm;
    uint8_t _pin;
    bool _reversed;
    uint8_t _minAngle;
    uint8_t _maxAngle;
    uint16_t _minPulse;
    uint16_t _maxPulse;
    bool _initialized;
    uint8_t _position;
    void _update();
    uint8_t _normalizePosition(uint8_t pos);
};

#endif
