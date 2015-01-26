---
layout: post
title: "OpenFrameworks+ArduinoでLチカ"
date: 2015-01-25 13:40:17 +0900
comments: true
categories: [OpenFrameworks, Arduino]
author: Yutaka Moriya
---
今回は回路のプッシュボタンを Arduino で送信、OpenFrameworks（v0.8.4使用）上で受信して表示を変更してみます。  
まずは簡単に OpenFrameworks と Arduino を紹介します。

## OpenFrameworksとは？
簡単に言うと C++ のフレームワークなんですが、アート作品を簡単に作ることを目的に作られています。  
また、今回使う Arduino や、 Kinect 、 LeapMotion などのセンサーを組み込む事も容易であり、インタラクティブな制作が簡単に行えます。
<iframe src="//player.vimeo.com/video/74124094" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/74124094">OF Showreel</a> from <a href="http://vimeo.com/of">openFrameworks</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

## Arduinoとは？
マイコンチップを搭載したハードウェアです。PCの専用ソフト`Arduino IDE`から Arduino へプログラムを書き込むことで回路を制御することができます。  
言語は Arduino 言語というものですがC++/Cをベースとしており、馴染みのある記法なので難しいことはありません。  

高度な電子工作とプログラミングを駆使すればこんなことも可能になります。
<iframe src="//player.vimeo.com/video/9928343" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/9928343">Super Mario Bros on an 8x8 LED matrix</a> from <a href="http://vimeo.com/chloester">Chloe Fan</a> on <a href="https://vimeo.com">Vimeo</a>.</p> 

## Arduinoの回路を組み立てる

Arduino の回路は以下のように、シンプルにプッシュボタンの状態をデジタル2ピンに送信するだけです。

![My image link text](/images/post/openframeworks-arduino-ltika/breadboard.jpg)  
簡単に解説すると、プッシュボタンを押すと3.3Vが2ピンに通電します。  
押していない時はGND(グランド)へ繋ぐことで、0Vの状態にします。（OFFの状態）  
ちなみに抵抗器を付けているのは、電源と GND を無抵抗で繋げると壊れる恐れがあります。
これをプルダウン抵抗といいます。

## Arduinoにスケッチを書き込む

OpenFrameworks 上で Arduino とシリアル通信を行うには、`ofSerial`と`ofArduino`の2パターンがありますが、今回は`ofArduino`を使用してみます。  
（`ofArduino`の中身は結局`ofSerial`を実行しているのですが、 Arduino をより便利に使うメンバ関数が用意されています。なので`ofSerial`でも Arduino とシリアル通信を行うことが出来ます）

`ofArduno`を使用するには Firmata というプロトコルを使用する必要があります。Arduino IDE 上にすでに用意されています。  
[ファイル]->[スケッチの例]->[Firmata]->[SimpleDigitalFirmata]を選択してスケッチを呼び出し、それを書き込みます。

![My image link text](/images/post/openframeworks-arduino-ltika/arduino-firmata.jpg)

## OpenFrameworks でプログラミング

OpenFrameworks 上では`ofAruino`を使用してシリアル通信を行います。

```cpp ofApp.h
#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

public:
    void setup();
    void update();
    void draw();
    
    void setupArduino(const int & version);
    void updateArduino();
    
    ofArduino ard; //ofArduinoクラス
    bool bSetupArduino; //Arduinoとの通信状態を格納
    int inputPin = 2; //今回使用しているデジタルピン2ピン
    ofImage light; //LEDを光らせているように見せる画像 各自で作ってみてください
};

```

```cpp ofApp.cpp
#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    ofSetFrameRate(60); //フレームレート60fpsで描画
    ofSetCircleResolution(30); //円の品質設定
    ofEnableAlphaBlending(); //透過描画を有効化
    ofBackground(0); //背景を黒に設定
    
    light.loadImage("light.png"); //画像を読み込む
    
    ard.connect("/dev/tty.usbmodem1411",57600); //Arduinoが接続されているシリアルポートと転送レートを指定
    ofAddListener(ard.EInitialized, this, &ofApp::setupArduino); //イベントリスナーを登録
    bSetupArduino = false; //通信状態はfalseに設定
}

//--------------------------------------------------------------
void ofApp::update(){
    
    updateArduino(); //updateArduinoを実行
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    //LEDの絵を描画
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
    
    //arduinoと通信していたら
    if (bSetupArduino){
        //指定したデジタルピンにインプットがあったら
        if (ard.getDigital(inputPin) == 1) {
            light.draw(ofPoint(185, 165), 100, 100); //画像を表示
        }
    }
}

void ofApp::setupArduino(const int & version) {
    
    ofRemoveListener(ard.EInitialized, this, &ofApp::setupArduino); //イベントリスナーを削除
    ard.sendDigitalPinMode(inputPin, ARD_INPUT); //指定したデジタルピンを有効化
    bSetupArduino = true; //接続状態をtrueに設定
}

void ofApp::updateArduino() {
    
    ard.update(); //Arduinoの状態を更新
}

```

## LED（絵）を光らせよう！

XcodeからBuildしてみましょう！以下の様なLEDが表示されると思います。

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

