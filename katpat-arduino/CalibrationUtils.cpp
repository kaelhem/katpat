/*
  CalibrationUtils.cpp - Library that helps to save and load data in EEPROM.
  Created by klem on 17/05/2019
*/

#include "Arduino.h"
#include <EEPROM.h>
#include "Leg.h"
#include "ServoController.h"
#include "CalibrationUtils.h"

static const unsigned long MEMORY_ID = 123456789;

CalibrationUtils::CalibrationUtils()
{
  
}

CalibrationObject CalibrationUtils::loadCalibration()
{
  CalibrationObject calibration;
  EEPROM.get(0, calibration);
  byte error = calibration.memoryId != MEMORY_ID;
  if (error) {
    for (uint8_t i = 0; i < 4; i++) {
      for (uint8_t j = 0; j < 3; j++) {
        calibration.minPulses[i][j] = 250;
        calibration.maxPulses[i][j] = 450;
      }
    }
  }
  return calibration;
}

void CalibrationUtils::saveCalibration(Leg legs[])
{
  CalibrationObject calibration;
  for (uint8_t i = 0; i < 4; i++) {
    for (uint8_t j = 0; j < 3; j++) {
      ServoController *servo = legs[i].getServoByIndex(j);      
      calibration.minPulses[i][j] = servo->getMinPulse();
      calibration.maxPulses[i][j] = servo->getMaxPulse();
    }
  }
  calibration.memoryId = MEMORY_ID;
  EEPROM.put(0, calibration);
}
