import sys
import numpy as np
import pandas as pd
import joblib
import json
import xgboost as xgb
from Vibration_Feature_Extractor import Extract_Time_Features, Extract_Freq_Features

rpm = int(sys.argv[2])
Fs = int(sys.argv[3])

try:
  vib = pd.read_csv(sys.argv[1], header=None, skiprows=4)
  vib = np.asarray(vib)[:,0:-1].transpose()
  
  rms_values = np.sqrt(np.mean(vib**2, axis=1)).tolist()
        
  TimeFeatureExtractor = Extract_Time_Features(vib)
  features_time = TimeFeatureExtractor.Features()

  FreqFeatureExtractor = Extract_Freq_Features(vib, rpm, Fs)
  features_freq = FreqFeatureExtractor.Features()

  features = np.concatenate((features_time, features_freq)).T
  data = pd.DataFrame(features)

  data.columns = ['AbsMax', 'AbsMean', 'P2P', 'RMS', 'Skewness', 'Kurtosis', 'Crest', 
                  'Shape', 'Impulse','1x', '2x', '3x', '4x', '1xB', '2xB', '3xB', '4xB']
  
  data['WATT'] = float(sys.argv[4])
except (NameError, IndexError, TypeError, pd.errors.EmptyDataError):
  print('Source Data Error')
else:
  df = data[['WATT', 'AbsMax', 'AbsMean', 'P2P', 'RMS', 'Skewness', 'Kurtosis', 'Crest', 
                  'Shape', 'Impulse','1x', '2x', '3x', '4x', '1xB', '2xB', '3xB', '4xB']]
  
  norm = np.load(sys.argv[6])
  X = (df - norm[0]) / norm[1]
  
  xgb_joblib = joblib.load(sys.argv[5]) 
  y_pred = xgb_joblib.predict(X)
  print(json.dumps({"code": str(y_pred[0]), "rms": rms_values}))

