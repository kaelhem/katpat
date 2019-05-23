/*
  ServoController.cpp - Library for manipulating servos of Katpat.
  Created by klem on 17/05/2019
*/

#include "Arduino.h"
#include "ServoController.h"
#include <Adafruit_PWMServoDriver.h>

ServoController::ServoController()
{
  _initialized = false;
}

void ServoController::setPin(uint8_t pin, Adafruit_PWMServoDriver pwm, bool reversed = false)
{
  _pin = pin;
  _pwm = pwm;
  _reversed = reversed;
}

uint8_t ServoController::_normalizePosition(uint8_t pos)
{
  uint8_t normalized = constrain(pos, _minAngle, _maxAngle);
  if (_reversed) {
    normalized = map(normalized, _minAngle, _maxAngle, _maxAngle, _minAngle);
  }
  return normalized;
}

void ServoController::initialize(uint8_t minAngle, uint8_t maxAngle, uint16_t minPulse, uint16_t maxPulse, uint8_t defaultPosition = 0)
{
  _minAngle = minAngle;
  _maxAngle = maxAngle;
  _minPulse = minPulse;
  _maxPulse = maxPulse;
  uint8_t pos = _normalizePosition(defaultPosition);
  uint16_t pulselen = map(pos, _minAngle, _maxAngle, _minPulse, _maxPulse);
  for (uint8_t a = 0; a < 5; a++) {
    _pwm.setPWM(_pin, 0, pulselen);
  }
  _position = pos;
  _initialized = true;
}

void ServoController::_update()
{
  if (!_initialized) {
    Serial.println("The servo #" + String(_pin) + " in not initialized!");
  } else {
    uint16_t pulselen = map(_position, _minAngle, _maxAngle, _minPulse, _maxPulse);
    _pwm.setPWM(_pin, 0, pulselen);
  }
}

void ServoController::increaseMinPulse(uint8_t pulse = 1)
{
  _minPulse += pulse;
  _update();
}

void ServoController::decreaseMinPulse(uint8_t pulse = 1)
{
  _minPulse -= pulse;
  _update();
}

void ServoController::increaseMaxPulse(uint8_t pulse = 1)
{
  _maxPulse += pulse;
  _update();
}

void ServoController::decreaseMaxPulse(uint8_t pulse = 1)
{
  _maxPulse -= pulse;
  _update();
}

void ServoController::rotate(uint8_t angle, uint8_t timer = 0)
{
  if (!_initialized) {
  	Serial.println("The servo #" + String(_pin) + " in not initialized!");
  } else {
    uint8_t pos = _normalizePosition(angle);
  	uint8_t dir = (_position <= pos ? 1 : -1);
  	for (uint8_t a = _position; dir == 1 ? a < pos : a > pos; a = a + dir) {
      uint16_t pulselen = map(a, _minAngle, _maxAngle, _minPulse, _maxPulse);
      _pwm.setPWM(_pin, 0, pulselen);
      if (timer > 0) {
        delay(timer);
      }
    }
    _position = pos;
  }
}

uint8_t ServoController::getPin()
{
  return _pin;
}

uint16_t ServoController::getMinPulse()
{
  return _minPulse;
}

uint16_t ServoController::getMaxPulse()
{
  return _maxPulse;
}

uint8_t ServoController::getMinAngle()
{
  return _minAngle;
}

uint8_t ServoController::getMaxAngle()
{
  return _maxAngle;
}

uint8_t ServoController::getPosition()
{
  return _position;
}

bool ServoController::isReversed()
{
  return _reversed;
}
