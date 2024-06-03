import sys
import numpy as np
import pandas as pd
import joblib
import json
import xgboost as xgb
from Current_Feature_Extractor import Extract_Time_Features, Extract_Phase_Features, Extract_Freq_Features

rpm = int(sys.argv[2])
Fs = int(sys.argv[3])

try:
  cur = pd.read_csv(sys.argv[1], header=None, skiprows=4)
  cur = np.asarray(cur)[:,0:3].transpose()
        
  TimeFeatureExtractor = Extract_Time_Features(cur)
  features_time = TimeFeatureExtractor.Features().flatten()

  PhaseFeatureExtractor = Extract_Phase_Features(cur, Fs)
  features_phase = PhaseFeatureExtractor.Features().flatten()

  FreqFeatureExtractor = Extract_Freq_Features(cur, rpm, Fs)
  features_freq = FreqFeatureExtractor.Features().flatten()

  features = np.concatenate((features_time, features_phase, features_freq))
  data = pd.DataFrame(features).T

  data.columns = ['R_AbsMax', 'S_AbsMax', 'T_AbsMax', 'R_AbsMean', 'S_AbsMean','T_AbsMean',
               'R_P2P', 'S_P2P', 'T_P2P', 'R_RMS', 'S_RMS', 'T_RMS', 
               'R_Skewness', 'S_Skewness', 'T_Skewness', 'R_Kurtosis', 'S_Kurtosis', 'T_Kurtosis',
               'R_Crest', 'S_Crest', 'T_Crest', 'R_Shape', 'S_Shape', 'T_Shape',
               'R_Impulse', 'S_Impulse', 'T_Impulse',
               'RS_phase', 'ST_phase', 'TR_phase', 'RS_Level', 'ST_Level', 'TR_Level',
               'R_1x', 'S_1x', 'T_1x', 'R_2x', 'S_2x', 'T_2x',
               'R_3x', 'S_3x', 'T_3x', 'R_4x', 'S_4x', 'T_4x']
  
  data['WATT'] = float(sys.argv[4])
except (NameError, IndexError, TypeError, pd.errors.EmptyDataError):
  print('Source Data Error')
else:
  df = data[['WATT', 'R_AbsMax', 'S_AbsMax', 'T_AbsMax', 'R_AbsMean', 'S_AbsMean','T_AbsMean',
                   'R_P2P', 'S_P2P', 'T_P2P', 'R_RMS', 'S_RMS', 'T_RMS', 
                   'R_Skewness', 'S_Skewness', 'T_Skewness', 'R_Kurtosis', 'S_Kurtosis', 'T_Kurtosis',
                   'R_Crest', 'S_Crest', 'T_Crest', 'R_Shape', 'S_Shape', 'T_Shape',
                   'R_Impulse', 'S_Impulse', 'T_Impulse',
                   'RS_phase', 'ST_phase', 'TR_phase', 'RS_Level', 'ST_Level', 'TR_Level',
                   'R_1x', 'S_1x', 'T_1x', 'R_2x', 'S_2x', 'T_2x',
                   'R_3x', 'S_3x', 'T_3x', 'R_4x', 'S_4x', 'T_4x']]
  xgb_joblib = joblib.load(sys.argv[5]) 
  y_pred = xgb_joblib.predict(df)
  print(y_pred[0])

