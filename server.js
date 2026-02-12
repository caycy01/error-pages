const express = require('express');
const app = express();
const port = 3000;

// 常见HTTP状态码详细描述
const statusDescriptions = {
  en: {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  },
  zh: {
    400: '错误的请求',
    401: '未授权',
    402: '需要付款',
    403: '禁止访问',
    404: '未找到',
    405: '方法不被允许',
    406: '不可接受',
    407: '需要代理身份验证',
    408: '请求超时',
    409: '冲突',
    410: '已删除',
    411: '需要长度',
    412: '前置条件失败',
    413: '请求实体过大',
    414: '请求URI过长',
    415: '不支持的媒体类型',
    416: '请求范围不满足',
    417: '期望失败',
    418: '我是一个茶壶',
    421: '错误定向的请求',
    422: '无法处理的实体',
    423: '已锁定',
    424: '失败的依赖',
    425: '过早',
    426: '需要升级',
    428: '需要前置条件',
    429: '请求过多',
    431: '请求头字段过大',
    451: '因法律原因不可用',
    500: '服务器内部错误',
    501: '未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: '不支持的HTTP版本',
    506: '变体也在协商中',
    507: '存储空间不足',
    508: '检测到循环',
    510: '未扩展',
    511: '需要网络身份验证',
  },
};

// 根据状态码获取错误类别标题
function getCategoryTitle(code, lang = 'zh') {
  const categories = {
    en: {
      informational: 'Informational',
      success: 'Success',
      redirection: 'Redirection',
      clientError: 'Client Error',
      serverError: 'Server Error',
      unknown: 'Unknown',
    },
    zh: {
      informational: '信息响应',
      success: '成功',
      redirection: '重定向',
      clientError: '客户端错误-你输入了正确的地址吗？',
      serverError: '服务器错误-联系站长解决问题',
      unknown: '未知',
    },
  };
  const cat = categories[lang] || categories.zh;
  if (code >= 100 && code < 200) return cat.informational;
  if (code >= 200 && code < 300) return cat.success;
  if (code >= 300 && code < 400) return cat.redirection;
  if (code >= 400 && code < 500) return cat.clientError;
  if (code >= 500 && code < 600) return cat.serverError;
  return cat.unknown;
}

// 核心：渲染错误页面（纯HTML，无任何链接）
function renderErrorPage(code, lang = 'zh') {
  const category = getCategoryTitle(code, lang);
  const unknownText = lang === 'en' ? 'Unknown Status Code' : '不是哥们? 你在干什么?';
  const description = statusDescriptions[lang]?.[code] || unknownText;
  const htmlLang = lang === 'en' ? 'en' : 'zh-CN';
  const pageTitle = lang === 'en' ? `Error ${code}` : `错误 ${code}`;

  // 根据状态码范围分配Fluent Design风格颜色
  let themeColors = {
    bg: '#f3f2f1',
    cardBg: '#ffffff',
    textColor: '#201f1e',
    accentColor: '#0078d4',
    hoverBg: '#f3f2f1',
    shadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
  };

  if (code >= 400 && code < 500) {
    themeColors = {
      bg: '#fdf2f0',
      cardBg: '#ffffff',
      textColor: '#a4262c',
      accentColor: '#d13438',
      hoverBg: '#fde7e9',
      shadow: '0 1.6px 3.6px 0 rgba(208, 74, 83, 0.132), 0 0.3px 0.9px 0 rgba(208, 74, 83, 0.108)'
    };
  } else if (code >= 500 && code < 600) {
    themeColors = {
      bg: '#fdf2f0',
      cardBg: '#ffffff',
      textColor: '#a80000',
      accentColor: '#d13438',
      hoverBg: '#fde7e9',
      shadow: '0 1.6px 3.6px 0 rgba(208, 74, 83, 0.132), 0 0.3px 0.9px 0 rgba(208, 74, 83, 0.108)'
    };
  } else if (code >= 300 && code < 400) {
    themeColors = {
      bg: '#eff6fc',
      cardBg: '#ffffff',
      textColor: '#003d62',
      accentColor: '#0078d4',
      hoverBg: '#eff6fc',
      shadow: '0 1.6px 3.6px 0 rgba(0, 120, 212, 0.132), 0 0.3px 0.9px 0 rgba(0, 120, 212, 0.108)'
    };
  } else if (code >= 200 && code < 300) {
    themeColors = {
      bg: '#dff6dd',
      cardBg: '#ffffff',
      textColor: '#107c10',
      accentColor: '#107c10',
      hoverBg: '#dff6dd',
      shadow: '0 1.6px 3.6px 0 rgba(16, 124, 16, 0.132), 0 0.3px 0.9px 0 rgba(16, 124, 16, 0.108)'
    };
  } else if (code >= 100 && code < 200) {
    themeColors = {
      bg: '#f3f2f1',
      cardBg: '#ffffff',
      textColor: '#323130',
      accentColor: '#605e5c',
      hoverBg: '#f3f2f1',
      shadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)'
    };
  }

  // 纯内联样式，无外部资源，无任何 a 标签 - Fluent Design风格
  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
      background: ${themeColors.bg};
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .error-container {
      max-width: 560px;
      width: 100%;
      padding: 48px 32px;
      background: ${themeColors.cardBg};
      color: ${themeColors.textColor};
      border-radius: 8px;
      box-shadow: ${themeColors.shadow};
      animation: fadeIn 0.3s cubic-bezier(0.1, 0.9, 0.2, 1);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .error-code {
      font-size: 88px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1;
      color: ${themeColors.accentColor};
      letter-spacing: -2px;
      font-family: 'Segoe UI Variable Display', 'Segoe UI', sans-serif;
    }
    .error-category {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: ${themeColors.accentColor};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .error-description {
      font-size: 17px;
      margin-bottom: 32px;
      line-height: 1.5;
      color: ${themeColors.textColor};
      font-weight: 400;
    }
    .divider {
      margin: 28px 0;
      border: none;
      height: 1px;
      background: rgba(0, 0, 0, 0.08);
    }
    .back-button {
      display: inline-block;
      padding: 10px 24px;
      background: ${themeColors.cardBg};
      color: ${themeColors.accentColor};
      border: 1px solid ${themeColors.accentColor};
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin: 16px 0;
      transition: all 0.167s cubic-bezier(0.1, 0.9, 0.2, 1);
      font-family: 'Segoe UI', sans-serif;
      min-width: 110px;
    }
    .back-button:hover {
      background: ${themeColors.hoverBg};
    }
    .back-button:active {
      transform: scale(0.98);
      background: ${themeColors.hoverBg};
    }
    .back-button:focus {
      outline: 2px solid ${themeColors.accentColor};
      outline-offset: 2px;
    }
    .button-group {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin: 16px 0;
    }
    .button-group button {
      flex-shrink: 0;
    }
    .back-button {
      margin: 0;
    }
    .contact-button {
      display: inline-block;
      padding: 10px 24px;
      background: ${themeColors.accentColor};
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.167s cubic-bezier(0.1, 0.9, 0.2, 1);
      font-family: 'Segoe UI', sans-serif;
      min-width: 110px;
    }
    .contact-button:hover {
      background: ${themeColors.accentColor};
      opacity: 0.9;
    }
    .contact-button:active {
      transform: scale(0.98);
    }
    .contact-button:focus {
      outline: 2px solid ${themeColors.accentColor};
      outline-offset: 2px;
    }
    .footer {
      font-size: 12px;
      opacity: 0.6;
      font-weight: 400;
      letter-spacing: 0.02em;
      color: ${themeColors.textColor};
    }
    /* 响应式设计 */
    @media (max-width: 640px) {
      .error-container {
        padding: 40px 24px;
        max-width: 90%;
      }
      .error-code {
        font-size: 72px;
        letter-spacing: -1.5px;
      }
      .error-category {
        font-size: 14px;
        letter-spacing: 0.06em;
      }
      .error-description {
        font-size: 16px;
        margin-bottom: 28px;
      }
      .divider {
        margin: 24px 0;
      }
      .button-group {
        flex-direction: column;
        gap: 8px;
      }
      .back-button, .contact-button {
        padding: 10px 24px;
        font-size: 14px;
        width: 100%;
        min-width: 0;
      }
      .footer {
        font-size: 11px;
      }
    }
    @media (max-width: 480px) {
      .error-container {
        padding: 32px 20px;
      }
      .error-code {
        font-size: 56px;
      }
      .error-category {
        font-size: 13px;
        letter-spacing: 0.04em;
      }
      .error-description {
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-code">${code}</div>
    <div class="error-category">${category}</div>
    <div class="error-description">${description}</div>
    ${code >= 500 && code < 600 ? `
      <div class="button-group">
        <button class="contact-button" onclick="location.href='mailto:cy@caynet.cn'">${lang === 'en' ? 'Contact Admin' : '联系站长'}</button>
        <button class="back-button" onclick="history.back()">${lang === 'en' ? 'Go Back' : '返回'}</button>
      </div>
    ` : `
      <button class="back-button" onclick="history.back()">${lang === 'en' ? 'Go Back' : '返回'}</button>
    `}
    <div class="divider"></div>
    <div class="footer">Copyright cay宸宇</div>
  </div>
</body>
</html>`;
}

// 根据浏览器的 Accept-Language 头自动检测语言
function detectLanguage(req) {
  // 优先使用 URL 参数中的 lang
  if (req.query.lang && ['en', 'zh'].includes(req.query.lang)) {
    return req.query.lang;
  }

  // 读取 Accept-Language 头
  const acceptLanguage = req.headers['accept-language'] || '';

  // 解析语言，返回第一个支持的语言
  // Accept-Language 格式通常是：zh-CN,zh;q=0.9,en;q=0.8
  const languages = acceptLanguage.split(',').map(lang => {
    const [code, priority] = lang.trim().split(';q=');
    return {
      code: code.toLowerCase(),
      priority: priority ? parseFloat(priority) : 1.0
    };
  }).sort((a, b) => b.priority - a.priority);

  // 检查是否有中文语言代码（zh-CN, zh-TW, zh-SG, zh, zh-HK 等）
  for (const lang of languages) {
    if (lang.code.startsWith('zh')) {
      return 'zh';
    }
    if (lang.code.startsWith('en')) {
      return 'en';
    }
  }

  // 默认返回中文
  return 'zh';
}

// 根路由：通过 ?code=xxx 指定错误代码，自动检测浏览器语言（可通过 ?lang=en 或 ?lang=zh 强制覆盖）
app.get('/', (req, res) => {
  let code = parseInt(req.query.code, 10);
  // 自动检测语言（优先使用 URL 参数，否则使用浏览器语言设置）
  const lang = detectLanguage(req);
  // 只有无效的状态码才默认转为 404，其他状态码（包括超出范围的）正常显示
  if (isNaN(code)) {
    code = 404;
  }
  const html = renderErrorPage(code, lang);
  // HTTP响应状态码必须在200-599之间才能正常渲染，100-199和600+都使用200
  const responseStatus = (code >= 200 && code < 600) ? code : 200;
  res.status(responseStatus).send(html);
});

// 捕获所有其他路径，同样支持自动语言检测和 code 参数（方便测试）
app.get('*', (req, res) => {
  let code = parseInt(req.query.code, 10);
  // 自动检测语言（优先使用 URL 参数，否则使用浏览器语言设置）
  const lang = detectLanguage(req);
  // 只有无效的状态码才默认转为 404，其他状态码（包括超出范围的）正常显示
  if (isNaN(code)) {
    code = 404;
  }
  const html = renderErrorPage(code, lang);
  // HTTP响应状态码必须在200-599之间才能正常渲染，100-199和600+都使用200
  const responseStatus = (code >= 200 && code < 600) ? code : 200;
  res.status(responseStatus).send(html);
});

app.listen(port, () => {
  console.log(`✅ 错误页面服务已启动：http://localhost:${port}`);
  console.log(`📌 自动检测浏览器语言：http://localhost:3000/?code=404`);
});