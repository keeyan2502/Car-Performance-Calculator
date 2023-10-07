var time;
var terminalvelocity;
var area;
function onOpenCvReady() {
    console.log( 'OpenCV Ready', cv);
}

function switchpagetoresults(time, area, terminalvelocity) {
    document.querySelector('body').innerHTML = '';
    document.querySelector('body').innerHTML = `        <div class="placeholder">
    <div id="p1">${ area }</div>
    <div id="p2">${ terminalvelocity }</div>
    <div id="p3">${ time }}</div>
</div>
<div id='header'> Statistics </div>
<ul class="circle">
    <li>Frontal Area: <b class='b1'></b>
        <div class="group">      
            <form id='form1' onsubmit="return changedp(1, dp1)">
                <input autocomplete="off" name='dp1' class='inputclass1' type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Number of Decimal Places (Press enter to submit) </label>
                <button type='submit' style='display:none;'></button>
            </form>  
        </div>
    </li>
    <li>Terminal Velocity: <b class='b2'></b>
        <div class="group">      
            <form onsubmit="return changedp(2, dp2)">
                <input autocomplete="off" name='dp2' class='inputclass1' type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Number of Decimal Places (Press enter to submit) </label>
                <button type='submit' style='display:none;'></button>
            </form>  
        </div>
    </li>
    <li>Race Time (F1 in Schools Track): <b class='b3'></b>
        <div class="group">    
            <form onsubmit="return changedp(3, dp3)">
                <input autocomplete="off" name='dp3' class='inputclass1' type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Number of Decimal Places (Press enter to submit) </label>
                <button type='submit' style='display:none;'></button>
            </form>  
            
        </div>
    </li>
    <li>
        We have tested this on cars where we know the Race Time, and it has been within 0.01s of the actual race time, however it may not be wholly accurate as some approximations must be made
    </li>
</ul>`
    return false;
    
}

function y() {
    time = 1.3388511561428630969317055132705718278884887695312500000000000000000000000000000000000000000000000000;
    terminalvelocity = 16.1168693578272019806263415375724434852600097656250000000000000000000000000000000000000000000000000000;
    area = 2227.1593873442275253182742744684219360351562500000000000000000000000000000000000000000000000000000000000;
    document.getElementById('r1').innerHTML = area.toFixed(3).toString() + 'mm²';
    document.getElementById('r2').innerHTML = terminalvelocity.toFixed(3).toString() + 'm/s';
    document.getElementById('r3').innerHTML = time.toFixed(3).toString() + 's';
    var mq = window.matchMedia( "(max-width: 768px)" );
    if (mq.matches) {
        console.log('mobile');
    }
    else {
        document.querySelector('#makeanalytics').style.display = 'block';
    }
    var stat = document.querySelector('.statistics');
    stat.scrollIntoView(false);
}

function l(blackAndWhiteImage) {
    //(thresh, blackAndWhiteImage) = cv.threshold(grayImage, 127, 255, cv.THRESH_BINARY)
    try { 
        //cv.imshow("canvasOutput", blackAndWhiteImage);
        //numberofblackpixels = blackAndWhiteImage.size - cv.countNonZero(blackAndWhiteImage)
        console.log(blackAndWhiteImage);
        var eachpixel = blackAndWhiteImage['data']
        var blackcount = 0;
        var whitecount = 0;
        for (var i = 0; i < eachpixel.length; i++) {
            var pixel = eachpixel[i];
            if (pixel == 0) {
                blackcount = blackcount + 1;
            }
            else {
                whitecount = whitecount + 1;
            }
        }
        var percentofblack = blackcount/(whitecount+blackcount);
        var height = blackAndWhiteImage.size().height;
        var width = blackAndWhiteImage.size().width;
        var heightreal = parseInt(document.querySelector('.input1').value);
        console.log(heightreal);
        var htp = heightreal/height
        var widthreal = (width * heightreal) / height
        var areainreal = heightreal * widthreal
        var areatoshow = (areainreal * percentofblack) / 0.738;
        var areatoshowforcalc = areatoshow / (1000**2)
        //IMP
        var dres1 = 0.07
        var dres2 = 0.2
        //IMP END
        var numerator = dres1*2;
        var denominator = areatoshowforcalc*1.21*dres2;
        var v = Math.sqrt(numerator/denominator);
        var accelerationtime = v/82.3;
        var distanceingoingtotv = accelerationtime * 0.5 * v
        var timeog = distanceingoingtotv/(v/2);
        var timeafter = (20-distanceingoingtotv)/v;
        var t = timeog + timeafter;
        console.log(areatoshow);
        console.log(v);
        console.log(t);
        time = t;
        terminalvelocity = v;
        area = areatoshow;
        localStorage.setItem('time', time)
        localStorage.setItem('terminalvelocity', v)
        localStorage.setItem('area', areatoshow)
        document.getElementById('r1').innerHTML = area.toFixed(3).toString() + 'mm²';
        document.getElementById('r2').innerHTML = terminalvelocity.toFixed(3).toString() + 'm/s';
        document.getElementById('r3').innerHTML = time.toFixed(3).toString() + 's';
        var mq = window.matchMedia( "(max-width: 768px)" );
        if (mq.matches) {
            console.log('mobile');
        }
        else {
            document.querySelector('#makeanalytics').style.display = 'block';
        }                
        var stat = document.querySelector('.statistics');
        stat.scrollIntoView(false);
        return false;
    }
    catch(e) {
        console.log('oof');
    }
}

function showeg(num) {
    var imgdiv = document.querySelector('.imgdiv');
    imgdiv.style.setOpacity = 0;
    var demoimagediv = document.querySelector('.demoimagediv');
    demoimagediv.style.display = 'block'
    imgdiv.style.display = 'block';
    imgdiv.innerHTML = `<img src='download${num}.png' id='popup'/>`;
    jQuery(".imgdiv").addClass('fade-in');
    var img = document.querySelector('#popup');
    img.addEventListener('touchmouve', popupleave);
    img.addEventListener('mouseleave', popupleave);
}

function popupleave() {
    var demoimagediv = document.querySelector('.demoimagediv');
    demoimagediv.style.display = 'none'
    var imgdiv = document.querySelector('.imgdiv');
    imgdiv.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    //var DISABLE_EXCEPTION_CATCHING = 0;
    var mq = window.matchMedia( "(max-width: 768px)" );
    if (mq.matches) {
        var div = document.querySelector('#buttonanalytics');
        div.remove();
        var p = document.querySelector('#ex');
        p.innerHTML = 'Example Image - Click Here - > '
    }
    Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: 'Montserrat, sans-serif'
                }
            }
    });
    try {
        let imgElement = document.getElementById('imageSrc');
        let inputElement = document.querySelector('.input-file');
        var form = document.querySelector('#mainform');
        inputElement.addEventListener('change', (e) => {
            imgElement.src = URL.createObjectURL(e.target.files[0]);
            var filename = (e.target.files[0]['name']);
            if (filename.length > 10) {
                filename = filename.substring(0,4) + '...'
            }
            document.querySelector('#text123').innerHTML = `Chosen ${filename}`;
        }, false);
        form.onsubmit = function() {
            if (document.querySelector('.input1').value.length == 0) {
                alert('Please Enter a Value for Height');
            }
            else {
                console.log('hi')
                let mat = cv.imread(imgElement, cv.COLOR_RGBA2GRAY);
                let bw = new cv.Mat();
                cv.threshold(mat, bw, 100,255,cv.THRESH_BINARY);
                l(bw);
                //console.log(l(bw));
                //get cv read on herer
                return false;
            }
        }
    }
    catch(e) {
        alert('Please Retry with a Valid Image');
    }
})

function returntomain() {
    document.querySelector('.analysisdiv').innerHTML = '';
    document.querySelector('.analysisdiv').style.display = 'none';
    document.querySelector('#big2').style.display = 'flex';
}
function makeanalytics() {
    var makearray = [];
    var makearrayexample = [];
    var makearrayexample2 = [];
    var makearray2 = [];
    var attv = 0;
    var timeattv;
    var timeinhundreths = (time*1000).toFixed(2);
    for (var i = 0; i < timeinhundreths; i++) {
        if (attv == 1) {
            var triangle = (terminalvelocity * timeattv) / 2;
            var rect = ((i/1000)-timeattv) * terminalvelocity;
            var distance = triangle + rect;
            var object = [i, distance];
            var object2 = [i,terminalvelocity];
            makearray2.push(object2);
            makearray.push(object);
        }
        else {
            var speed = (82.3*i/1000);
            if (speed > terminalvelocity) {
                var object = [i, terminalvelocity*(i/1000)/2];
                makearray.push(object);
                var object2 = [i,terminalvelocity];
                makearray2.push(object2);
                attv = 1;
                timeattv = (i/1000);
            }
            else {
                var object = [i, speed*(i/1000)/2];
                makearray.push(object);
                var object2 = [i,speed];
                makearray2.push(object2);
            }
        }

        var objectexample = [i,20]
        makearrayexample.push(objectexample);
        var objectexample2 = [i,terminalvelocity]
        makearrayexample2.push(objectexample2);
    }

    var accelerationstouse = [];
    var x = 82.3;
    for (var i = 0; i < (timeattv*1000); i++) {
        var changeinaccelerationleadinguptotv = 82.3 / (timeattv*1000);
        x = x - changeinaccelerationleadinguptotv
        accelerationstouse.push(x);
    }
    console.log(accelerationstouse);
    var attv1 = 0;
    var prevspeed = 0;
    var fakearrayforspeed = [];
    var fakearrayfordistance = []
    for (var i = 0; i < timeinhundreths; i++) {
        if (attv1 == 1) {
            var fakeobject = [i,terminalvelocity];
            fakearrayforspeed.push(fakeobject);
            var triangle = (terminalvelocity * timeattv) / 2;
            var rect = ((i/1000)-timeattv) * terminalvelocity;
            var distance = triangle + rect;
            var objectdistance = [i, distance];
        }
        else {
            if (i >= accelerationstouse.length) {
                attv1 = 1;
            }
            else {
                var speedx = (prevspeed + (accelerationstouse[i]/1000));
                var speed = speedx*2
                prevspeed = speedx;
                var fakeobject = [i,speed];
                var objectdistance = [i, speed*(i/1000)/2];
                fakearrayforspeed.push(fakeobject);
            }
        }
        fakearrayfordistance.push(objectdistance);
    }
    console.log(fakearrayfordistance);
    document.querySelector('#big2').style.display = 'none';
    document.querySelector('.analysisdiv').style.display = 'flex';
    document.querySelector('.analysisdiv').innerHTML = `<div class='col'><div class='col'><figure class="highcharts-figure">
<div id="container2"></div>
<p class="highcharts-description">
This chart shows how speed varies over time, you can use this to see how long it takes to reach your terminal velocity. The curved nature of this graph is due to algorithms used to take into account the effect of air resistance on the acceleration of the car.
</p>
<br>
</figure></div><div class='col'><figure class="highcharts-figure">
<div id="container"></div>
<p class="highcharts-description">
This chart shows how the distance varies over time.
</p>
</figure></div></div><div class='col-2 backbutton' onclick='returntomain()'><img id='backpic' style='size:small' src='backarrow.png'/>
</div>`;
    var colour = '#00ccff'
    Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
    function (data) {
        Highcharts.getOptions().colors.push('#00ccff')
        Highcharts.chart('container', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Distance Over Time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            title: {
                text: 'Race Time in Milliseconds'
            },
            type: 'millisecond'
        },
        yAxis: {
            title: {
            text: 'Distance (m)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                return 'Distance : <b>' + this.y + '</b>m';
            }
        },
        plotOptions: {
            area: {
            fillColor: {
                linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
                },
                stops: [
                [0, colour],
                [1, Highcharts.color(Highcharts.getOptions().colors[10]).setOpacity(0.4).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                lineWidth: 1
                }
            },
            threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Your Car',
            data: fakearrayfordistance
        }, {
            type: 'line',
            name: 'Finish Line',
            data: makearrayexample

        }]
        });
    }
    );

    Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
    function (data) {

        Highcharts.chart('container2', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Speed Over Time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            title: {
                text: 'Race Time in Milliseconds'
            },
            type: 'millisecond'
        },
        yAxis: {
            title: {
            text: 'Speed (m/s)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                return 'Speed : <b>' + this.y + '</b>m/s';
            }
        },
        plotOptions: {
            area: {
            fillColor: {
                linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
                },
                stops: [
                [0, colour],
                [1,Highcharts.color(Highcharts.getOptions().colors[10]).setOpacity(0.4).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                lineWidth: 1
                }
            },
            threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Your Car',
            data: fakearrayforspeed
        }, {
            type: 'line',
            name: 'Terminal Velocity',
            data: makearrayexample2

        }]
        });
    }
    );



    // series: [{
    //     name: 'Finish Line',
    //     data: makearrayexample
    // }, {
    //     name: 'Your Car',
    //     data: makearray
    // }]

    console.log(makearray);
    console.log(makearray2);
}

function changedp(numtochange) {
    event.preventDefault();
    var btoaddin = document.querySelector(`#r${numtochange}`); 
    var decimalplaces = document.querySelector(`#dp${numtochange}`).value;
    if (numtochange == 1) {
        var value = (area.toFixed(decimalplaces)).toString() + 'mm²'
    }
    else if (numtochange == 2) {
        var value = (terminalvelocity.toFixed(decimalplaces)).toString() + 'm/s'
    }
    else if (numtochange == 3) {
        var value = (time.toFixed(decimalplaces)).toString() + 's'
    }
    btoaddin.innerHTML = value;
    return false;
}