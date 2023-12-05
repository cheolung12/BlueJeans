

### <a href='' target="_blank">🔗 Demo Link</a>
### <a href='' target="_blank"> 📣 Presentation </a> 
<br />

# 목차
<ul>
  <li>
    <a href='#1-프로젝트-소개'>1. 프로젝트 소개</a>
  </li>
  <li>
    <a href='#2-팀원-소개'>2. 팀원 소개</a>
  </li>
  <li>
    <a href='#3-시스템-구조도'>3. 시스템 구조도</a>
  </li>
  <li>
    <a href='#4-erd-api-명세서'>4. ERD, API 명세서</a>
  </li>
  <li>
    <a href='#5-기능-소개'>5. 기능 소개</a>
  </li>
  <li>
    <a href='#6-실행-방법'>5. 실행 방법</a>
  </li>
</ul>
<br/><br />

# 1. 프로젝트 소개

LOGO
> 블루진스는 즐거운 시니어 라이프를 위한 디지털 환경을 제공해주는 웹 서비스입니다.
> 
> 👩‍💼 노인 일자리 공고 게시판: 여전히 일에 대한 열정이 있는 시니어를 위한 맞춤 공고입니다ㅏ.
> 
> 📚 eBook (전자책): 언제 어디서든 간편하게 책을 읽을 수 있습니다. 나만의 서재를 만들어보세요.
>
> 💬 챗봇 서비스: OPEN AI API를 활용한 챗봇을 통해 다양한 주제로 대화를 할 수 있습니다. 
>
> ✒️ 백일장 이벤트: 노년의 특별한 순간을 기록하고 공유하여 소중한 경험을 함께 나눕니다.
>
> 🏡 집찾기 서비스: 집 주소 등록으로 언제 어디서나 안전한 경로를 제공하여 노인들의 실종 사고를 예방합니다.
>
>  이러한 기능들을 통해 노인 고독사와 실종등 시니어 관련 사회적 문제를 해결하는 것이 목표입니다.


<br /><br />

# 2. 팀원 소개

<img align="left" src="https://github.com/cheolung12/BlueJeans/assets/109952479/0c187a95-fcfe-44e6-bb82-cde047346368" width="170" height="160" >

```
😀 이름 : 김민재
📧 이메일 : lylebang9397@gmail.com

📌 역할 : Front-end
    - 일자리 게시판 
    - 마이페이지 

```


<img align="left" src="https://github.com/cheolung12/BlueJeans/assets/109952479/1bb82839-8256-485c-8d92-0f79f9514c09" width="170" height="160">

```
😀 이름 : 이영경
📧 이메일 : lyk1040@gmail.com

📌 역할 : Front-end
    - 메인페이지 
    - 집 찾기 

```


<img align="left" src="https://github.com/cheolung12/BlueJeans/assets/109952479/6732a9b1-5954-4575-9065-d637bb80aa8e" width="170" height="160" >

```
😀 이름 : 전유민
📧 이메일 : gkjm123@naver.com
업
📌 역할 : Front-end
    - ebook 게시판, 뷰어 
    - 에세이 게시판 

```


<img align="left" src="https://github.com/cheolung12/BlueJeans/assets/109952479/7f8207b1-7f37-48ed-8daa-8b6db5922497" width="170" height="160">

```
😀 이름 : 마아송
📧 이메일 : woss3223@gmail.com

📌 역할 : Back-end
    - erd 설계
    - Spring Security, 계정 관련 서버 
    - 에세이 서버
    - AWS EC2배포 및 RDS, S3 연결
```

<img align="left" src="https://github.com/cheolung12/BlueJeans/assets/109952479/acf47209-5941-4541-9c15-b77022c3c5dd" width="170" height="160" >

```
😀 이름 : 홍철웅
📧 이메일 : cheolung97@gmail.com

📌 역할 : Front-end, Back-end
    - erd 설계
    - 챗봇 (클라이언트, 서버)
    - 로그인, 회원가입 (클라이언트)
    - ebook, 일자리, 마이페이지 (서버)
```

<br /><br />

## 3. 시스템 구조도
![architecture](https://github.com/cheolung12/BlueJeans/assets/109952479/f699bd24-7298-4e4f-9021-bbfc72d2ac64)
<br /><br />

## 4. ERD, API 명세서
<code> ERD </code>  

![erd](https://github.com/cheolung12/BlueJeans/assets/109952479/f48ded54-ebd2-429a-8e4b-8ba4014185f7)

<br />

<code> API 명세서 </code>

Swagger 활용 -> 로컬에서 서버 실행 후 아래링크로 접속

[API 명세서 (Swagger)](http://localhost:8080/swagger-ui/index.html)

![명세서](https://github.com/cheolung12/BlueJeans/assets/109952479/77f120d9-09c6-43bd-a5c3-91e47384bed9)

<br />

## 5. 기능 소개
<br />

## 6. 로컬 실행 방법

### Frontend

<b>requirement: Node.js</b>

1. 로컬에서 teminal을 열어 아래의 명령어를 실행
    
    ```
    git clone https://github.com/cheolung12/BlueJeans.git
    ```

2. 복제가 완료되면 아래의 명령어를 실행하여 웹 클라이언트 폴더로 이동
   
    ```
    cd client
    ``````

3. 실행에 필요한 패키지들을 설치하고 실행
   
   ```
   yarn install
   yarn start
   ```
<br />

### Backend
<b>requirement: Java, Docker</b>
1. 로컬에서 teminal을 열어 아래의 명령어를 실행
    
    ```
    git clone https://github.com/cheolung12/BlueJeans.git
    ```

2. 복제가 완료되면 아래의 명령어를 실행하여 웹 서버 폴더로 이동
   
   ```
   cd server
   ```

3. `/src/main/java/com.bluejeans.server/ServerApplication.java` 실행
