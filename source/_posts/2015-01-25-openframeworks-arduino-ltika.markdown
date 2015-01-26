---
layout: post
title: "OpenFrameworks+ArduinoでLチカ"
date: 2015-01-25 13:40:17 +0900
comments: true
categories: [OpenFrameworks, Arduino]
author: Yutaka Moriya
---
今回は回路のプッシュボタンをArduinoで送信、OpenFrameworks上で受信して表示を変更してみます。  
まずは簡単にOpenFrameworksとArduinoを紹介します。

## OpenFrameworksとは？
簡単に言うとC++のフレームワークなんですが、アート作品を簡単に作ることを目的に作られています。  
また、今回使うArduinoや、Kinect、LeapMotionなどのセンサーを組み込む事も容易であり、インタラクティブな制作が簡単に行えます。
<iframe src="//player.vimeo.com/video/74124094" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/74124094">OF Showreel</a> from <a href="http://vimeo.com/of">openFrameworks</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

## Arduinoとは？
マイコンチップを搭載したハードウェアです。PCの専用ソフト`Arduino IDE`からArduinoへプログラムを書き込むことで回路を制御することができます。  
言語はArduino言語というものですがC++/Cをベースとしており、馴染みのある記法なので難しいことはありません。  

高度な電子工作とプログラミングを駆使すればこんなことも可能になります。
<iframe src="//player.vimeo.com/video/9928343" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/9928343">Super Mario Bros on an 8x8 LED matrix</a> from <a href="http://vimeo.com/chloester">Chloe Fan</a> on <a href="https://vimeo.com">Vimeo</a>.</p> 

## Arduinoの回路を組み立てる

Arduinoの回路は以下のように、シンプルにプッシュボタンの状態をデジタル2ピンに送信するだけです。

![My image link text](/images/post/openframeworks-arduino-ltika/breadboard.jpg)

OpenFrameworks上でArduinoとシリアル通信を行うには、`ofSerial`と`ofArduino`の2パターンがありますが、今回は`ofArduino`を使用してみます。
（OpenFrameworks 0.8.4使用）

`ofArduno`を使用するにはFirmataというプロトコルを使用する必要があります。Arduino IDE上にすでに用意されています。  
[ファイル]->[スケッチの例]->[Firmata]->[SimpleDigitalFirmata]を選択してスケッチを呼び出し、それを書き込みます。

![My image link text](/images/post/openframeworks-arduino-ltika/arduino-firmata.jpg)

OpenFrameworks上では`ofAruino`を使用してシリアル通信を行います。

ofApp.h
```
#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

public:
    void setup();
    void update();
    void draw();
    
    void setupArduino(const int & version);
    void updateArduino();
    
    ofArduino ard;
    bool bSetupArduino;
    int inputPin = 2;
    ofImage light;
};

```
ofApp.cpp
```
#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    ofSetFrameRate(60);
    ofSetCircleResolution(30);
    ofEnableAlphaBlending();
    ofBackground(0);
    
    light.loadImage("light.png");
    
    ard.connect("/dev/tty.usbmodem1411",57600);
    ofAddListener(ard.EInitialized, this, &ofApp::setupArduino);
    bSetupArduino = false;
}

//--------------------------------------------------------------
void ofApp::update(){
    
    updateArduino();
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    float offsetX = 210;
    float offsetY = 200;
    
    ofSetColor(255, 0, 0);
    ofCircle(25+offsetX, 20+offsetY, 20);
    ofRect(5+offsetX, 20+offsetY, 40, 30);
    ofSetColor(255, 255, 255, 150);
    ofTriangle(15+offsetX, 30+offsetY, 25+offsetX, 30+offsetY, 15+offsetX, 40+offsetY);
    ofTriangle(30+offsetX, 30+offsetY, 30+offsetX, 40+offsetY, 20+offsetX, 40+offsetY);
    ofRect(30+offsetX, 30+offsetY, 5, 10);
    ofRect(10+offsetX, 30+offsetY, 5, 20);
    ofRect(35+offsetX, 30+offsetY, 5, 20);
    ofSetColor(255, 255, 255);
    ofRect(10+offsetX, 50+offsetY, 5, 50);
    ofRect(35+offsetX, 50+offsetY, 5, 50);
    ofSetColor(255, 0, 0);
    ofRect(0+offsetX, 45+offsetY, 50, 5);
    
    if (bSetupArduino){
        if (ard.getDigital(inputPin) == 1) {
            light.draw(ofPoint(185, 165), 100, 100);
        }
    }
}

void ofApp::setupArduino(const int & version) {
    
    ofRemoveListener(ard.EInitialized, this, &ofApp::setupArduino);
    ard.sendDigitalPinMode(inputPin, ARD_INPUT);
    bSetupArduino = true;
}

void ofApp::updateArduino() {
    
    ard.update();
}

```

![My image link text](/images/post/openframeworks-arduino-ltika/led-off.png)

プッシュボタンを押すとLEDが・・・

![My image link text](/images/post/openframeworks-arduino-ltika/led-on.png)

　 　　　　 |  
　 　＼　　__　　／  
　 　＿　（ｍ）　＿ﾋﾟｺｰﾝ  
　 　　　　|ミ|  
　 　 ／ 　｀´　 ＼  
　　　　　('A`)  
　　　　　ノヽノヽ  
　　　　　　　くく  

