# Not Found

- https://not-found0209.netlify.app
- 개발을 하다가 에러가 생기면 질문을 올릴 수 있는 커뮤니티 입니다.

## Demo
[영상 바로가기 ⬅️](https://youtu.be/JxKipGB43qc)

## 기술 스택
React, TypeScript, React Router, Firebase, Axios, TOAST UI Editor, Tailwind CSS, CRA

## 프로젝트 기능
- 회원가입, 로그인 기능
- 구글 로그인 기능
- 게시글 CRUD
- 댓글 CRUD
- 검색 기능

## 프로젝트 설명
- 비회원도 게시글과 댓글은 볼 수 있도록 구현해서 어느 누구나 손 쉽게 정보를 얻어갈 수 있도록 제작했습니다.
- Firebase Realtime Database을 사용해서 실시간으로 업데이트 된 게시글을 확인할 수 있도록 제작했습니다.
- Firebase Authentication을 사용해서 회원가입과 구글 로그인이 가능하도록 구현했습니다.
- 홈페이지 관리를 위하여 로그인한 회원만 글작성과 댓글 작성이 가능하도록 구현했습니다.
- 댓글 기능으로 작성자와 소통을 할 수 있습니다.
- 카테고리 별로 게시글을 구분하여 사용자가 원하는 주제에 좀 더 편하게 접근할 수 있습니다.
- TOAST UI Editor(텍스트 에디터)를 사용해서 사용자들이 좀 더 편하게 글을 작성할 수 있도록 제작했습니다.

## Installation

1. `git clone https://github.com/eunju0209/not-found.git`
2. `cd not-found`
3. `yarn install`
4. `yarn start`

> .env 파일을 별로도 추가해서 firebase SDK를 설정해 주셔야 합니다.

| 환경 변수 명                           | firebaseConfig 종류 |
| -------------------------------------- | ------------------- |
| REACT_APP_FIREBASE_API_KEY             | apiKey              |
| REACT_APP_FIREBASE_AUTH_DOMAIN         | authDomain          |
| REACT_APP_FIREBASE_DB_URL              | databaseURL         |
| REACT_APP_FIREBASE_PROJECT_ID          | projectId           |
| REACT_APP_FIREBASE_STORAGE_BUCKET      | storageBucket       |
| REACT_APP_FIREBASE_MESSAGING_SENDER_ID | messagingSenderId   |
| REACT_APP_FIREBASE_APP_ID              | appId               |
| REACT_APP_FIREBASE_MEASUREMENT_ID      | measurementId       |
