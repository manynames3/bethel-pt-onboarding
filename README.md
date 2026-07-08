# 아틀란타 벧엘교회 찬양팀 온보딩

아틀란타 벧엘교회 찬양팀 멤버들이 예배 준비에 필요한 연습 시간, 악보, 음원, 파트별 온보딩 자료를 한 곳에서 확인할 수 있는 정적 웹사이트입니다.

Live site: https://bethel-pt-onboarding.pages.dev/

## 주요 기능

- 주일 예배와 토요 연습 시간 안내
- 헌금송, 축복송, 특별 순서 악보 미리보기
- 주일 예배와 금요 예배 YouTube 플레이리스트 링크
- 메인 건반, 세컨 건반, 어쿠스틱 기타, 일렉 기타, 베이스, 드럼, 싱어, Aviom 파트별 온보딩 페이지
- 브라우저 기반 관리자 패널로 곡 제목, PDF 업로드, 연습 시간 메모 수정
- 데스크톱과 모바일을 함께 고려한 v2 에디토리얼 레이아웃

## 관리자

관리자 코드: `bethel`

관리자에서 수정한 내용은 현재 브라우저에 저장됩니다. 텍스트 설정은 `localStorage`, 업로드한 PDF는 IndexedDB에 저장됩니다. 별도 로그인 서버나 CMS가 없는 정적 사이트이므로, 한 브라우저에서 수정한 내용이 다른 사람에게 자동 공유되지는 않습니다.

## 로컬 실행

정적 파일만으로 동작합니다.

```bash
python3 -m http.server 4175 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4175/`를 엽니다.

## 파일 구조

- `index.html`: 홈, 연습 시간, 악보 뷰어, 관리자 패널
- `styles.css`: v2 공통 디자인 시스템과 반응형 레이아웃
- `script.js`: 홈 화면 렌더링, 악보 리소스, 관리자 저장 로직
- `onboarding/`: 파트별 온보딩 페이지
- `onboarding-data.js`: 파트별 온보딩 데이터
- `onboarding-page.js`: 파트별 페이지 렌더링
- `practice-schedule.js`: 월별 토요 연습 시간 계산
- `assets/`: 로고, 예배 공간 이미지, 악보 PDF/JPG 자료

## 배포

Cloudflare Pages 프로젝트: `bethel-pt-onboarding`

이 프로젝트는 Git 연동이 아닌 Cloudflare Pages direct upload 방식으로 배포됩니다.

```bash
wrangler pages deploy . --project-name=bethel-pt-onboarding --branch=main
```

현재 v2 작업 브랜치: `v2`
