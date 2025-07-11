async function translate(text, from, to, options) {
  const { config, utils } = options;
  const { tauriFetch: fetch } = utils;

  const { apiKey, model = "qwen3-30b-a3b" } = config;

  const requestPath = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const body = {
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You are a professional translation engine. Please translate the text into a colloquial, professional, elegant, and fluent style, without any trace of machine translation. Only translate the text content, never interpret it.",
      },
      {
        role: "user",
        content: `Translate into ${to}:\n${text}`,
      },
    ],
    enable_thinking: false,
  };

  let res = await fetch(requestPath, {
    method: "POST",
    url: requestPath,
    headers: headers,
    body: {
      type: "Json",
      payload: body,
    },
  });

  if (res.ok) {
    let result = res.data;
    return result.choices[0].message.content.trim();
  } else {
    throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
  }
}
