# taew00kim.github.io

김태우의 포트폴리오 사이트입니다. Vite, React, TypeScript, 일반 CSS로 만들었고, 인쇄물처럼 읽히는 한 단 문서 형태입니다.

- 모든 문구와 이미지 경로는 `src/data.ts` 한 파일에 있고, 컴포넌트는 `src/components`에 있습니다.
- `npm install`, `npm run dev`로 개발하고 `npm run build`로 `dist/`를 만듭니다.
- 인쇄(A4)하면 프로젝트 상세가 모두 펼쳐진 채 출력됩니다.
- `main`에 푸시하면 `.github/workflows/deploy.yml`이 GitHub Pages로 배포합니다. 저장소 설정의 Pages 소스는 GitHub Actions로 둡니다.
- 이력서 PDF는 `public/resume.pdf`, 프로필 사진은 `public/profile.jpg`입니다.
