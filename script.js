document.addEventListener("DOMContentLoaded", () => {
  // 獲取DOM元素
  const inputText = document.getElementById("input-text");
  const annotateButton = document.getElementById("annotate-button");
  const clearButton = document.getElementById("clear-button");
  const fullModeButton = document.getElementById("full-mode");
  const paragraphModeButton = document.getElementById("paragraph-mode");
  const romajiToggle = document.getElementById("romaji-toggle");
  const fullContent = document.getElementById("full-content");
  const paragraphContent = document.getElementById("paragraph-content");
  const annotatedText = document.getElementById("annotated-text");
  const playAllButton = document.getElementById("play-all");
  const copyAllButton = document.getElementById("copy-all");

  // 示例數據 - 在實際應用中，這些數據將從API獲取
  const sampleAnnotations = [
    {
      original: "私は日本語を勉強しています。",
      annotated:
        '<span class="annotated-word"><span class="furigana">わたし</span><span class="kanji">私</span><span class="romaji">watashi</span></span>は<span class="annotated-word"><span class="furigana">にほん</span><span class="kanji">日本</span><span class="romaji">nihon</span></span><span class="annotated-word"><span class="furigana">ご</span><span class="kanji">語</span><span class="romaji">go</span></span>を<span class="annotated-word"><span class="furigana">べんきょう</span><span class="kanji">勉強</span><span class="romaji">benkyou</span></span>しています。',
    },
    {
      original: "東京は日本の首都です。",
      annotated:
        '<span class="annotated-word"><span class="furigana">とうきょう</span><span class="kanji">東京</span><span class="romaji">tokyo</span></span>は<span class="annotated-word"><span class="furigana">にほん</span><span class="kanji">日本</span><span class="romaji">nihon</span></span>の<span class="annotated-word"><span class="furigana">しゅと</span><span class="kanji">首都</span><span class="romaji">shuto</span></span>です。',
    },
    {
      original: "桜の花が綺麗ですね。",
      annotated:
        '<span class="annotated-word"><span class="furigana">さくら</span><span class="kanji">桜</span><span class="romaji">sakura</span></span>の<span class="annotated-word"><span class="furigana">はな</span><span class="kanji">花</span><span class="romaji">hana</span></span>が<span class="annotated-word"><span class="furigana">きれい</span><span class="kanji">綺麗</span><span class="romaji">kirei</span></span>ですね。',
    },
  ];

  // 示例標註函數 - 在實際應用中將使用API進行標註
  function annotateText(text) {
    // 簡單的模擬標註 - 將輸入的文本與示例數據匹配
    const lines = text.trim().split("\n");
    const annotatedLines = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        annotatedLines.push("");
        return;
      }

      // 尋找匹配的樣本
      const match = sampleAnnotations.find(
        (sample) => sample.original === trimmedLine
      );

      if (match) {
        annotatedLines.push(match.annotated);
      } else {
        // 假設無法標註的文本保持原樣
        annotatedLines.push(trimmedLine);
      }
    });

    return annotatedLines;
  }

  // 顯示標註結果
  function displayAnnotationResult(annotatedLines) {
    // 清除現有結果
    annotatedText.innerHTML = "";
    paragraphContent.innerHTML = "";

    // 檢查是否有內容
    if (
      annotatedLines.length === 0 ||
      (annotatedLines.length === 1 && !annotatedLines[0])
    ) {
      annotatedText.innerHTML =
        '<p class="placeholder-text">沒有內容可標註</p>';
      paragraphContent.innerHTML =
        '<div class="paragraph-placeholder"><p>沒有內容可標註</p></div>';
      return;
    }

    // 更新全篇模式內容
    const fullContentHtml = annotatedLines
      .map((line) => (line ? `<p class="annotated-line">${line}</p>` : "<br>"))
      .join("");
    annotatedText.innerHTML = fullContentHtml;

    // 更新分段模式內容
    const paragraphsHtml = annotatedLines
      .map((line) => {
        if (!line) return "";
        return `
                <div class="paragraph-item">
                    <div class="paragraph-text">
                        <p class="annotated-line">${line}</p>
                    </div>
                    <div class="paragraph-actions">
                        <button class="play-paragraph action-button"><i class="fas fa-play"></i></button>
                        <button class="copy-paragraph action-button"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            `;
      })
      .join("");

    paragraphContent.innerHTML = paragraphsHtml;

    // 為新增的按鈕添加事件監聽器
    document.querySelectorAll(".play-paragraph").forEach((button, index) => {
      button.addEventListener("click", () => {
        playParagraph(annotatedLines[index]);
      });
    });

    document.querySelectorAll(".copy-paragraph").forEach((button, index) => {
      button.addEventListener("click", () => {
        copyToClipboard(annotatedLines[index].replace(/<[^>]*>/g, ""));
        showCopyFeedback(button);
      });
    });
  }

  // TTS功能 - 在實際應用中將使用Web Speech API或其他TTS服務
  function playParagraph(text) {
    // 移除HTML標籤以獲取純文本
    const plainText = text.replace(/<[^>]*>/g, "");

    // 使用Web Speech API (目前僅在某些瀏覽器支持)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = "ja-JP"; // 設置為日語
      window.speechSynthesis.speak(utterance);
    } else {
      alert("您的瀏覽器不支持語音合成功能");
    }
  }

  // 複製文本到剪貼板
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("無法複製文本: ", err);
    });
  }

  // 顯示複製成功反饋
  function showCopyFeedback(button) {
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.backgroundColor = "var(--success-color)";
    button.style.color = "white";

    setTimeout(() => {
      button.innerHTML = originalIcon;
      button.style.backgroundColor = "";
      button.style.color = "";
    }, 1500);
  }

  // 事件監聽器
  annotateButton.addEventListener("click", () => {
    const text = inputText.value.trim();
    if (!text) {
      alert("請輸入日文文本進行標註");
      return;
    }

    const annotatedLines = annotateText(text);
    displayAnnotationResult(annotatedLines);
  });

  clearButton.addEventListener("click", () => {
    inputText.value = "";
    annotatedText.innerHTML =
      '<p class="placeholder-text">標註結果將顯示在這裡...</p>';
    paragraphContent.innerHTML =
      '<div class="paragraph-placeholder"><p>選擇分段模式時，文本將按行分割，每行可以單獨播放或複製。</p></div>';
  });

  fullModeButton.addEventListener("click", () => {
    fullModeButton.classList.add("active");
    paragraphModeButton.classList.remove("active");
    fullContent.classList.add("active");
    paragraphContent.classList.remove("active");
  });

  paragraphModeButton.addEventListener("click", () => {
    paragraphModeButton.classList.add("active");
    fullModeButton.classList.remove("active");
    paragraphContent.classList.add("active");
    fullContent.classList.remove("active");
  });

  romajiToggle.addEventListener("change", () => {
    if (romajiToggle.checked) {
      document.body.classList.add("show-romaji");
    } else {
      document.body.classList.remove("show-romaji");
    }
  });

  playAllButton.addEventListener("click", () => {
    const text = annotatedText.textContent.trim();
    if (
      text &&
      text !== "標註結果將顯示在這裡..." &&
      text !== "沒有內容可標註"
    ) {
      playParagraph(text);
    }
  });

  copyAllButton.addEventListener("click", () => {
    const text = annotatedText.textContent.trim();
    if (
      text &&
      text !== "標註結果將顯示在這裡..." &&
      text !== "沒有內容可標註"
    ) {
      copyToClipboard(text);
      showCopyFeedback(copyAllButton);
    }
  });
});
