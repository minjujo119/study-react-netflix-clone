// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./data/theme";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
/* reset */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,p,table,th,td,form,fieldset,legend,input,select,textarea,button,article,aside,dialog,header,section,footer,nav,figure,main{margin:0;padding:0}
  article,aside,dialog,header,section,footer,nav,figure,main{display:block}
  html,body{-webkit-text-size-adjust:none;-ms-text-size-adjust:none}
  ul,ol{list-style:none}
  table{table-layout:fixed;border-spacing:0}
  input,button,select{-webkit-appearance:none;appearance:none;border:0;border-radius:0;background-color:transparent}
  input::-ms-clear{display:none}
  img,fieldset{border:0;vertical-align:top}
  em,address{font-style:normal}
  a{color:#242424;text-decoration:none;cursor:pointer}
  a,button,input,label,img{-webkit-touch-callout:none;-webkit-user-select:none;-ms-user-select: none;user-select:none}
  button{cursor:pointer;white-space:nowrap}
  button::-moz-focus-inner{padding:0;border:0}
  ::-webkit-file-upload-button{cursor:pointer}
  hr{display:none}
  .blind,caption span,legend{overflow:hidden;position:absolute;width:1px;height:1px;margin:-1px;padding:0;clip:rect(0,0,0,0)}
  
  /* common */
  body,input,select,textarea,button,a{color:#111;font-family:'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif}
  body.scroll_lock{overflow:hidden;touch-action:none}
  div{-webkit-box-sizing:border-box;box-sizing:border-box}
  input:focus{outline:0}
  input::placeholder{font-size:14px;line-height:20px;color:rgba(0,0,0,0.38)}
  input::-webkit-input-placeholder{font-size:14px;line-height:20px;color:rgba(0,0,0,0.38)}
  input:-ms-input-placeholder{font-size:14px;line-height:20px;color:rgba(0,0,0,0.38)}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb {border-radius:10px;background:rgba(0,0,0,0.2)}
  .skip{height:0}
  .skip a{display:block;position:absolute;left:0;top:-100px;width:100%;text-align:center}
  .skip a:focus, .skip a:active{position:absolute;top:0;z-index:210;padding:10px 0;background:#000;font-weight:bold;color:#fff;font-size:20px;text-decoration:none}
  .wrap{position:relative;width:100%;height:100%;margin:0 auto}
`;

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </QueryClientProvider>
);