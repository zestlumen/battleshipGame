## JavaScript로 만든 전함격투게임
### 바로가기 https://6530f18744769c0007c3dc6b--minibattleshipgame.netlify.app/
- HTML/CSS/JS로 구현, Netlify로 배포
- HTML에서는 최소한의 구조만 잡고 JS에서 요소 생성 및 행동 구현
- 이중 for문을 활용해 td요소로 게임보드 생성 및 고유한 id를 부여로 명중/실패 구분
- 배열의 indexOf() 메서드를 활용해 명중 여부 확인
- do while 루프로 조건에 맞을 때까지 반복적으로 전함 생성
- JS에 model(게임 상태 저장, 상태 변화에 대한 논리 구현), view(모델 안에서 상태 변화가 일어났을 때 화면 갱신), controller(모든 객체를 연결,발사 횟수,게임 진행 상황 관리, 종료 여부 판단) 객체를 이용한 구조화
- 격침 버튼을 엔터로도 할 수 있도록 하고, 게임보드에 직접적으로 클릭으로도 격침할 수 있도록 함
<br/>
<br/>

## 게임 화면 
<br/>
게임 초기 화면
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/a46b3ed4-fd33-4ff1-ad82-e27f99b5ba4d" />
<br/>
<br/>
전함 격침 실패시
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/3bd59e06-b167-4b0b-b8fb-ea6b9f9d308a" />
<br/>
<br/>
범위를 넘어선 위치를 인풋창에 적을 경우
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/785a2af6-6796-4db3-acea-ddb77a4ae40e"  />
<br/>
<br/>
전함 명중 시
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/cfe201c4-0988-4133-82be-2349943a49a8"  />
<br/>
<br/>
전함이 3대씩 3곳에 위치하며 1곳을 처리했을 때
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/afb6e382-22dd-4a48-bd50-6d7f0676c9f3"  />
<br/>
<br/>
모든 전함 처리 완료 - 게임 종료 화면(전함 격침 횟수 표시, 화면 클릭 시 게임 재실행)
<img src="https://github.com/zestlumen/battleshipGame/assets/122693004/6f4d92ae-1625-48c8-8fb6-08942292257e"  />

#### 참고자료
Head First javaScropt Programming 책 참고

