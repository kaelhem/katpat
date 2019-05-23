/*
  CalibrationUtils.h - Library that helps to save and load data in EEPROM.
  Created by klem on 17/05/2019
*/
#ifndef CalibrationUtils_h
#define CalibrationUtils_h

#include "Arduino.h"
#include <EEPROM.h>
#include "Leg.h"
#include "ServoController.h"

struct CalibrationObject {
  unsigned long memoryId;
  uint16_t minPulses[4][3];
  uint16_t maxPulses[4][3];
};

class CalibrationUtils
{
  public:
    CalibrationUtils();
    CalibrationObject loadCalibration();
    void saveCalibration(Leg legs[]);
};

#endif
