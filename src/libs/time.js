function getNowFormatDate(theDate){
    var day = theDate;
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    // 初始化时间
    Year= day.getFullYear();// ie火狐下都可以
    Month= day.getMonth()+1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10 ){
        CurrentDate += Day ;
    } else {
        CurrentDate += "0" + Day ;
    }
    return CurrentDate;
}

//这个方法将取得某年(year)第几周(weeks)的星期几(weekDay)的日期
function getXDate(year,weeks,weekDay){
    // 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日
    // 因为计算机中的月份是从0开始的,所以有如下的构造方法
    var date = new Date(year,"0","1");
    // 取得这个日期对象 date 的长整形时间 time
    var time = date.getTime();
    // 将这个长整形时间加上第N周的时间偏移
    // 因为第一周就是当前周,所以有:weeks-1,以此类推
    // 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
    time+=(weeks-1)*7*24*3600000;
    // 为日期对象 date 重新设置成时间 time
    date.setTime(time);
    return getNextDate(date,weekDay);
}
// 这个方法将取得 某日期(nowDate) 所在周的星期几(weekDay)的日期
function getNextDate(nowDate,weekDay){
    // 0是星期日,1是星期一,...
    weekDay%=7;
    var day = nowDate.getDay();
    var time = nowDate.getTime();
    var sub = weekDay-day;
    if(sub <= 0){
        sub += 7;
    }
    time+=sub*24*3600000;
    nowDate.setTime(time);
    return nowDate;
}

function isInOneYear(_year,_week){
    if(_year == null || _year == '' || _week == null || _week == ''){
        return true;
    }
    var theYear = getXDate(_year,_week,7).getFullYear();
    if(theYear != _year){
        return false;
    }
    return true;
}

// 获取日期范围显示
function getDateRange(_year,_week){
    var beginDate;
    var endDate;
    if(_year == null || _year == '' || _week == null || _week == ''){
        return "";
    }
    beginDate = getXDate(_year,_week,1);
    endDate = getXDate(_year,(_week - 0 + 1),7);
    return getNowFormatDate(beginDate) + " 至 "+ getNowFormatDate(endDate);
}

//日期处理
function dateRange(obj){
    //获取当前年
    var year = $("#yearId").val();
    if(isInOneYear(year,obj.value)){
        var showDate = getDateRange(year,obj.value);
        document.getElementById("_dateRange_import").value=showDate;
    }else{
        alert(year+"年无"+obj.value+"周，请重新选择");
        return;
    }
}

 export function getNumOfWeeks(){
    var myDate = new Date();
    var year = myDate.getFullYear();  //获取当前年
    var d=new Date(year,0,1);
    var yt=(( year%4==0 && year%100!=0) || year%400==0)? 366:365;
    var allwk = Math.ceil((yt-d.getDay())/7.0);
    return allwk;
}