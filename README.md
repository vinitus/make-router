# SPA Router

## 요구사항 및 조건

요구사항 - SPA Router 기능을 만들기
사용 기술 - React, History API

### 목표

1. 주소 라우팅
   \- `/`: 메인 도메인으로 접속시 `root` 페이지
   \- `/about`: 해당 path로 접속시 `about` 페이지
   <br/>

2. 버튼 클릭과 뒤로가기에 대한 구현
   \- 버튼 클릭시 해당 페이지로 이동해야함
   \- 뒤로가기 버튼 입력시 이전 페이지로 이동해야함
   <br/>

3. Router, Route 컴포넌트로 구현해야 하며, 다음과 같은 구조를 가져야함

```javascript
ReactDOM.createRoot(container).render(
  <Router>
    <Route path='/' component={<Root />} />
    <Route path='/about' component={<About />} />
  </Router>
);
```

4. useRouter Hook을 작성해야함

```javascript
const { push } = useRouter();
```

## 고려할 점

1. **`Router`를 통한 페이지 이동시 새로고침이 되지 않아야한다.**
   이전에 `React Router`를 살펴봤었을 때 `history.pushState`를 통해서 페이지를 이동했었다. `history`는 `state`를 통해서 변화를 감지하고 스택을 쌓을지를 감지한다.
   <br/>

2. **`/about` path로 접속하면 바로 `about` 페이지가 나타나야 한다.**
   더 나아가서, `/about` 페이지로 접속하고 뒤로가기를 누른다면, 이전에 있던 페이지로 가야한다.
   <br/>

3. **`useRouter`의 return 값은 `push` 함수를 반환해야한다.**
   `push`만 반환할 수도 있고, 더 많이 할 수도 있다.
