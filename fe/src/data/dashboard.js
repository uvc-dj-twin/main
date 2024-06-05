
const test =
{dailyCount: {
  totalCount: 100300,
  passCount: 100100,
  failCount: 10100,
  },
  dailyState:{
    totalCount: 13,
    passCount: 11,
    failCount: 3,
  },
  realtimeResult:{
    equipment:[
      {equipmentName:"L-SF-04",
      equipmentId: 1,
      ///기본장비정보//
      ThresholdCount: 300,
      ThresholdPercent: 11,
      ///장비 threshold 정보//


      currentCount: 100,
      currentFailCount: 10,
      currentRatioPercent: 10,
      currentResult:'베어링 손상',
      currentTime: '2022-01-01 01:02:03',
      ///////장비 전류정보////////
      vibrationCount: 101,
      vibrationFailCount: 33,
      vibrationRatioPercent: 11,
      vibrationResult:'베어링 손상',
      vibrationTime: '2022-01-01 01:02:04'
      ///////장비 진동정보////////

      ,},
    ]
  }
}








// serialFault:{

//   금일검사현황:{총수(전류+진동):x+y,금일정상(전류+진동):x,금일이상(전류+진동)y},
//   운영장비현황:{총수:x+y,정상장비:x,이상장비:y(전류+진동 중 하나라도  이상인 경우)},

//   장비정보:{
// {id:l-sf 전류검사수: 전동검사수:},
// {id:r-sf},

//   }

  
    
export default test; 
