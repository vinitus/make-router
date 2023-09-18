# SPA Router

## 실행방법

1. 모듈 설치하기
   `yarn`을 입력하여 필요한 모듈 설치
2. 실행하기
   `yarn dev`를 입력하여 개발 모드로 프로젝트를 실행할 수 있습니다.
3. 웹 열기
   `yarn dev`를 입력한 상태 그대로에서 o (영어 o)를 입력하면 브라우저가 열립니다.

## 요구사항 및 조건

요구사항 - SPA Router 기능을 만들기
사용 기술 - React, History API

### 목표

1. 주소 라우팅
   - `/`: 메인 도메인으로 접속시 `root` 페이지
   - `/about`: 해당 path로 접속시 `about` 페이지
   <br/>

2. 버튼 클릭과 뒤로가기에 대한 구현
   - 버튼 클릭시 해당 페이지로 이동해야함
   - 뒤로가기 버튼 입력시 이전 페이지로 이동해야함
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
   `History API`의 메서드 중에서 pushState와 popState를 사용하면, 해결할 수 있다.
   `history`는 `state`를 통해서 변화를 감지하고 스택을 쌓을지를 감지한다.
   <br/>

2. **`/about` path로 접속하면 바로 `about` 페이지가 나타나야 한다.**
   더 나아가서, 다른 도메인에서 `/about` 페이지로 접속하고 뒤로가기를 누른다면, 이전에 있던 페이지로 가야한다.
   <br/>

3. **`useRouter`의 return 값은 `push` 함수를 반환해야한다.**
   `push`만 반환할 수도 있고, 더 많이 할 수도 있다.

## 요구사항 풀어내기

1. `history` 자체를 컨트롤 해줄 곳
   push를 리턴하는 useRouter에서 history.pushState를 해줘야할 것으로 생각된다.
   <br/>

2. `popstate` 이벤트
   브라우저의 뒤로가기는 `popstate` 이벤트이다. 그러니까, 이를 감지하고 `state` 변경에 따른 컴포넌트를 렌더링해야한다.
   이를 하지 않는 다면, **뒤로가기는 진행되지만 그려지고 있는 컴포넌트는 바뀌지 않는다.**
   <br/>

3. `Router` 컴포넌트
   - `Router` 컴포넌트는 `Props`가 없다.
   - React에서 표현해줄 모든 컴포넌트를 감싸는 컴포넌트이다.
   - `Router` 컴포넌트에서는 url의 `path`를 `state`로 관리해야한다.
   - 이 상태는 모든 컴포넌트에서 사용할 수 있어야 한다. 때문에, `context API`로 관리
   - 모든 리액트 컴포넌트를 감싸는 컴포넌트이니까, `popstate` 이벤트 리스너를 여기서 사용한다.
   - 자식 컴포넌트가 있기에, `{children}`으로 자식 컴포넌트를 내려줄 필요가 있다.
   <br/>

4. `Route` 컴포넌트
   - `Router` 컴포넌트의 자식 컴포넌트로써, `props`로 `path`와 `component`를 받는다.
   - `Router` 컴포넌트에서 만든 `context` 객체를 가져와서 `useContext`로 `pathname`을 받고 사용한다.
   <br/>

5. `Page` 폴더의 컴포넌트
   - 버튼이 존재하며, `onClick` 이벤트로 `push` 함수를 호출한다.
   - `useRouter` 훅을 호출하고 리턴되는 `push` 함수로 어떤 페이지로 이동시킨다.

## 문제점

1. url은 변하지만 컴포넌트는 변경되지 않는 문제

```jsx
import useRouter from '../hook/useRouter';

export default function Root() {
  const { push } = useRouter();

  return (
    <>
      <h2>Root</h2>
      <button
        type='button'
        onClick={() => {
          push({ path: '/about', componentName: 'About' });
        }}
      >
        About
      </button>
    </>
  );
}
```

아마도 state가 변경되지 않아서 re-rendering이 발생하지 않는 듯하다.
라우터에서 conetxt의 상태를 변경해야할까?

근데 popstate를 이미 이벤트 리스너를 등록해놨는데.. 굳이 해야할까? 싶었다.

구글링하다가 mdn 문서로 들어갔다.

[mdn의 popstate 이벤트 공식문서](https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event)

여기서 PopStateEvent를 생성자로해서 이벤트 객체를 생성하고, dispatchEvent로 할 수 있었다.

```jsx
export interface HistoryPushStateArgs {
  path: string;
  componentName: string;
}

export default function useRouter() {
  const push = ({ path, componentName }: HistoryPushStateArgs) => {
    history.pushState({ pathname: path }, componentName, path);

    const popStateEvnetInstance = new PopStateEvent('popstate');

    dispatchEvent(popStateEvnetInstance);
  };
  return { push };
}
```

이렇게 해서 해결!
