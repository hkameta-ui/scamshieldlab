/**
 * ScamShield AI - Interactive Application Logic
 * Heuristic Scam Analyzer, Threat Radar, Resilience Quiz & Incident Playbook
 */

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  initAnalyzer();
  initThreatRadar();
  initQuiz();
  initIncidentPlaybook();
  initAffiliateCards();
  initMobileNav();
  initFaqAccordion();
});

/* ==========================================================================
   1. Live Threat Ticker
   ========================================================================== */
function initTicker() {
  const tickerItems = [
    "🚨 CRITICAL ALERT: Real-time AI voice cloning scam rings surge 310% targeting family emergencies.",
    "⚠️ HIGH RISK: Deepfake video conference CFO impersonation tricks enterprise finance teams ($25M loss).",
    "🛡️ DEFENSE TIP: Establish an offline family secret safe word today — bypass synthetic audio deception.",
    "⚠️ ALERT: Malicious sponsored ads found for 'Sora Video Desktop' dropping LummaC2 info-stealers.",
    "💡 ADVICE: Freeze credit on Experian, Equifax, and TransUnion to block synthetic AI credit applications."
  ];

  const tickerContainer = document.getElementById("liveThreatTicker");
  if (tickerContainer) {
    tickerContainer.innerHTML = tickerItems.map(item => `<span class="ticker-pill">${item}</span>`).join(" &bull; ");
  }
}

/* ==========================================================================
   2. Interactive AI Scam & Phishing Analyzer Engine
   ========================================================================== */
function initAnalyzer() {
  const inputEl = document.getElementById("scamTextInput");
  const scanBtn = document.getElementById("analyzeBtn");
  const clearBtn = document.getElementById("clearTextBtn");
  const presetsContainer = document.getElementById("presetsContainer");
  const resultsContainer = document.getElementById("analyzerResults");
  const scanningIndicator = document.getElementById("scanningIndicator");

  if (!inputEl || !scanBtn) return;

  // Render presets buttons
  if (presetsContainer && window.ANALYZER_PRESETS) {
    presetsContainer.innerHTML = window.ANALYZER_PRESETS.map((p, idx) => `
      <button type="button" class="preset-chip" data-idx="${idx}">
        <span class="chip-dot"></span> ${p.name}
      </button>
    `).join("");

    presetsContainer.querySelectorAll(".preset-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-idx");
        const preset = window.ANALYZER_PRESETS[idx];
        if (preset) {
          inputEl.value = preset.sample;
          presetsContainer.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          runAnalysis(preset.sample);
        }
      });
    });
  }

  scanBtn.addEventListener("click", () => {
    const text = inputEl.value.trim();
    if (!text) {
      alert("Please paste or type a suspicious message, email, or URL to analyze.");
      return;
    }
    runAnalysis(text);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      if (resultsContainer) resultsContainer.style.display = "none";
      if (presetsContainer) {
        presetsContainer.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active"));
      }
    });
  }

  function runAnalysis(text) {
    if (scanningIndicator) scanningIndicator.style.display = "flex";
    if (resultsContainer) resultsContainer.style.display = "none";

    // Simulate real-time neural heuristic scan delay
    setTimeout(() => {
      const evaluation = evaluateScamRisk(text);
      renderResults(evaluation);
      if (scanningIndicator) scanningIndicator.style.display = "none";
      if (resultsContainer) {
        resultsContainer.style.display = "block";
        resultsContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 650);
  }

  function evaluateScamRisk(text) {
    const flags = [];
    let score = 0;
    const lower = text.toLowerCase();

    // 1. Extreme Urgency / Pressure Tactics
    const urgencyKeywords = [
      "immediately", "urgent", "emergency", "within 24 hours", "police", "arrest", 
      "jail", "bail", "hospital", "car accident", "don't hang up", "hurry", 
      "strictly confidential", "before 5:00 pm", "breach penalty"
    ];
    const matchedUrgency = urgencyKeywords.filter(k => lower.includes(k));
    if (matchedUrgency.length > 0) {
      score += Math.min(30, matchedUrgency.length * 10);
      flags.push({
        severity: "HIGH",
        title: "High-Pressure Psychological Urgency",
        description: `Detected high-urgency panic trigger words: "${matchedUrgency.slice(0, 3).join('", "')}". Attackers use panic to short-circuit critical evaluation.`
      });
    }

    // 2. Financial & Untraceable Payment Demands
    const cryptoRegex = /\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b|\b0x[a-fA-F0-9]{40}\b/i;
    const paymentKeywords = [
      "bitcoin atm", "crypto", "wire transfer", "escrow", "zelle", "gift card", 
      "cash app", "western union", "moneygram", "wallet address", "usdt", "deposit"
    ];
    const hasCryptoAddress = cryptoRegex.test(text);
    const matchedPayments = paymentKeywords.filter(k => lower.includes(k));

    if (hasCryptoAddress || matchedPayments.length > 0) {
      score += 35;
      const desc = hasCryptoAddress 
        ? "Contains an explicit public cryptocurrency wallet address. Crypto transactions are completely irreversible."
        : `Requests payment via high-risk, non-refundable channels: "${matchedPayments.slice(0, 3).join('", "')}".`;
      flags.push({
        severity: "CRITICAL",
        title: "Irreversible Payment / Crypto Demands",
        description: desc
      });
    }

    // 3. Investment Fraud & Pig Butchering Patterns
    const investmentKeywords = [
      "guaranteed return", "guaranteed yield", "arbitrage", "trading signals", 
      "passive income", "18% weekly", "goldman sachs", "insider tips", "crypto liquidity",
      "wrong number", "polite gentleman", "assistant gave me"
    ];
    const matchedInvestment = investmentKeywords.filter(k => lower.includes(k));
    if (matchedInvestment.length > 0) {
      score += 30;
      flags.push({
        severity: "CRITICAL",
        title: "Pig Butchering / High-Yield Deception",
        description: `Contains classic romance/crypto confidence patterns ("${matchedInvestment.slice(0, 3).join('", "')}"). Legitimate financial institutions never guarantee high weekly returns.`
      });
    }

    // 4. Secrecy & Out-of-Band Disruption
    const secrecyKeywords = [
      "don't tell mom", "keep this secret", "non-disclosure", "cannot take calls", 
      "my phone broke", "police officer letting me", "in-flight", "confidential"
    ];
    const matchedSecrecy = secrecyKeywords.filter(k => lower.includes(k));
    if (matchedSecrecy.length > 0) {
      score += 25;
      flags.push({
        severity: "HIGH",
        title: "Isolation & Secrecy Demands",
        description: `Caller/sender explicitly demands secrecy or claims inability to speak via phone ("${matchedSecrecy.slice(0, 2).join('", "')}"). This is designed to prevent you from conferring with family or advisors.`
      });
    }

    // 5. Deceptive URLs & Phishing Links
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const urls = text.match(urlRegex) || [];
    const suspiciousTlds = [".top", ".xyz", ".vip", ".cc", ".icu", ".work", ".cfd", ".buzz", ".live"];
    let suspiciousUrlFound = false;

    urls.forEach(u => {
      if (suspiciousTlds.some(tld => u.toLowerCase().includes(tld)) || u.includes("defi-") || u.includes("-trading")) {
        suspiciousUrlFound = true;
      }
    });

    if (suspiciousUrlFound) {
      score += 35;
      flags.push({
        severity: "CRITICAL",
        title: "Deceptive or Newly Registered Domain",
        description: "The link points to an unusual or unverified Top-Level Domain (TLD) commonly used for throwaway phishing portals and fake crypto dashboards."
      });
    } else if (urls.length > 0) {
      score += 10;
      flags.push({
        severity: "MODERATE",
        title: "Embedded Hyperlink Present",
        description: "Contains clickable links. Never log into accounts through links received via unsolicited messages. Navigate directly to the official website instead."
      });
    }

    // Cap score at 98 for realistic detection, floor at 5
    score = Math.min(98, Math.max(5, score));

    // Determine category rating
    let riskLevel = "LOW RISK";
    let riskColor = "var(--color-success)";
    let summaryText = "No prominent scam patterns detected. The message appears to follow standard correspondence formatting.";

    if (score >= 65) {
      riskLevel = "CRITICAL THREAT";
      riskColor = "var(--color-danger)";
      summaryText = "DANGER: This text displays multiple signature indicators of high-threat cyber fraud (e.g. AI voice clone emergency, deepfake CEO fraud, or Pig Butchering). DO NOT send funds or credentials.";
    } else if (score >= 35) {
      riskLevel = "MODERATE SUSPICION";
      riskColor = "var(--color-warning)";
      summaryText = "CAUTION: This communication contains suspicious urgency or financial phrasing. Verify the sender's identity through an independent, pre-established channel before taking action.";
    }

    return { score, riskLevel, riskColor, flags, summaryText };
  }

  function renderResults(data) {
    const dialVal = document.getElementById("analyzerScoreValue");
    const dialLevel = document.getElementById("analyzerRiskLevel");
    const dialSummary = document.getElementById("analyzerRiskSummary");
    const flagsList = document.getElementById("analyzerFlagsList");
    const meterFill = document.getElementById("analyzerMeterFill");

    if (dialVal) dialVal.textContent = `${data.score}/100`;
    if (dialLevel) {
      dialLevel.textContent = data.riskLevel;
      dialLevel.style.color = data.riskColor;
    }
    if (dialSummary) dialSummary.textContent = data.summaryText;

    if (meterFill) {
      meterFill.style.width = `${data.score}%`;
      meterFill.style.backgroundColor = data.riskColor;
    }

    if (flagsList) {
      if (data.flags.length === 0) {
        flagsList.innerHTML = `
          <div class="clean-state-box">
            <span class="clean-icon">🛡️</span>
            <div>
              <strong>No High-Risk Red Flags Detected</strong>
              <p>While no automated triggers fired, always maintain healthy skepticism with unexpected attachments or requests for sensitive data.</p>
            </div>
          </div>
        `;
      } else {
        flagsList.innerHTML = data.flags.map(f => `
          <div class="flag-item ${f.severity.toLowerCase()}">
            <div class="flag-header">
              <span class="badge ${f.severity.toLowerCase()}">${f.severity}</span>
              <span class="flag-title">${f.title}</span>
            </div>
            <p class="flag-desc">${f.description}</p>
          </div>
        `).join("");
      }
    }
  }
}

/* ==========================================================================
   3. AI Threat Radar 2026 Database & Filtering
   ========================================================================== */
function initThreatRadar() {
  const container = document.getElementById("threatCardsGrid");
  const filterTabs = document.querySelectorAll(".threat-filter-tab");
  const searchInput = document.getElementById("threatSearchInput");

  if (!container || !window.THREAT_DATABASE) return;

  function renderCards(threats) {
    if (threats.length === 0) {
      container.innerHTML = `
        <div class="no-results-card">
          <p>No threats matching your current filter. Try adjusting your search term.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = threats.map(t => `
      <div class="threat-card" data-category="${t.category}">
        <div class="threat-card-header">
          <span class="threat-badge" style="background: rgba(239, 68, 68, 0.15); color: ${t.severityColor}; border: 1px solid ${t.severityColor};">
            ${t.severity}
          </span>
          <span class="threat-category-tag">${t.categoryName}</span>
        </div>

        <h3 class="threat-card-title">${t.title}</h3>
        <p class="threat-summary">${t.summary}</p>

        <div class="threat-impact-row">
          <strong>Estimated Impact:</strong> ${t.impact}
        </div>

        <div class="threat-section-title">Key Indicators (Red Flags):</div>
        <ul class="threat-indicators-list">
          ${t.indicators.map(ind => `<li>${ind}</li>`).join("")}
        </ul>

        <div class="threat-defense-box">
          <div class="defense-title">🛡️ Recommended Defense:</div>
          <p>${t.countermeasures}</p>
        </div>

        <div class="case-study-callout">
          <strong>Real-World Incident:</strong> ${t.caseStudy}
        </div>
      </div>
    `).join("");
  }

  // Initial render
  renderCards(window.THREAT_DATABASE);

  // Tab Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      applyFilter();
    });
  });

  // Search Filtering
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyFilter();
    });
  }

  function applyFilter() {
    const activeTab = document.querySelector(".threat-filter-tab.active");
    const category = activeTab ? activeTab.getAttribute("data-filter") : "all";
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filtered = window.THREAT_DATABASE.filter(item => {
      const matchesCategory = (category === "all") || (item.category === category);
      const matchesQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query) ||
        item.indicators.some(i => i.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    renderCards(filtered);
  }
}

/* ==========================================================================
   4. Interactive "How Scam-Proof Are You?" Quiz
   ========================================================================== */
function initQuiz() {
  const quizBox = document.getElementById("quizContainer");
  if (!quizBox || !window.QUIZ_QUESTIONS) return;

  let currentIdx = 0;
  let userScore = 0;
  const total = window.QUIZ_QUESTIONS.length;

  function renderQuestion(idx) {
    const q = window.QUIZ_QUESTIONS[idx];
    quizBox.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${((idx + 1) / total) * 100}%"></div>
      </div>
      <div class="quiz-header-meta">
        <span class="quiz-step-count">Scenario ${idx + 1} of ${total}</span>
        <span class="quiz-score-badge">Current Score: ${userScore}/${idx * 20} pts</span>
      </div>

      <h3 class="quiz-question-title">${q.question}</h3>

      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button type="button" class="quiz-opt-btn" data-oidx="${oIdx}">
            <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>

      <div id="quizFeedbackBox" class="quiz-feedback-box" style="display: none;"></div>
      <div id="quizNextBtnRow" style="display: none; margin-top: 1.5rem; text-align: right;">
        <button type="button" id="quizNextBtn" class="btn btn-primary">
          ${idx + 1 === total ? "View Final Security Assessment" : "Next Scenario &rarr;"}
        </button>
      </div>
    `;

    // Bind option clicks
    const optButtons = quizBox.querySelectorAll(".quiz-opt-btn");
    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const oIdx = parseInt(btn.getAttribute("data-oidx"), 10);
        handleAnswer(q, oIdx, optButtons);
      });
    });
  }

  function handleAnswer(question, selectedIdx, allBtns) {
    allBtns.forEach(b => b.disabled = true);
    const selectedOpt = question.options[selectedIdx];
    const feedbackBox = document.getElementById("quizFeedbackBox");
    const nextBtnRow = document.getElementById("quizNextBtnRow");
    const nextBtn = document.getElementById("quizNextBtn");

    if (selectedOpt.correct) {
      userScore += 20;
      allBtns[selectedIdx].classList.add("correct");
      if (feedbackBox) {
        feedbackBox.className = "quiz-feedback-box success";
        feedbackBox.innerHTML = `<strong>Correct! 🎯</strong> ${selectedOpt.explanation}`;
        feedbackBox.style.display = "block";
      }
    } else {
      allBtns[selectedIdx].classList.add("wrong");
      // Highlight the correct one
      question.options.forEach((opt, i) => {
        if (opt.correct) allBtns[i].classList.add("correct");
      });
      if (feedbackBox) {
        feedbackBox.className = "quiz-feedback-box danger";
        feedbackBox.innerHTML = `<strong>Incorrect ⚠️</strong> ${selectedOpt.explanation}`;
        feedbackBox.style.display = "block";
      }
    }

    if (nextBtnRow) nextBtnRow.style.display = "block";
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIdx + 1 < total) {
          currentIdx++;
          renderQuestion(currentIdx);
        } else {
          renderFinalAssessment();
        }
      });
    }
  }

  function renderFinalAssessment() {
    let rating = "";
    let ratingClass = "";
    let guidance = "";

    if (userScore >= 80) {
      rating = "Cyber Shield Fortress (High AI Resilience)";
      ratingClass = "badge-success";
      guidance = "Outstanding! You possess an advanced understanding of synthetic voice threats, deepfake vectors, and social engineering. Keep your tools updated and share this knowledge with friends and family.";
    } else if (userScore >= 60) {
      rating = "Moderate Awareness (Vulnerable to Advanced Deepfakes)";
      ratingClass = "badge-warning";
      guidance = "Good base awareness, but you could still fall victim to high-fidelity AI voice clones or sophisticated Quishing attacks. Implementing out-of-band verification is your best next step.";
    } else {
      rating = "High Risk (Easily Targeted by Modern AI Scams)";
      ratingClass = "badge-danger";
      guidance = "You are at significant risk of being exploited by automated GenAI fraud networks. We strongly recommend reading our Deepfake Protection Guide and installing an Identity Theft Protection suite immediately.";
    }

    quizBox.innerHTML = `
      <div class="quiz-final-results">
        <div class="final-score-circle">
          <span class="score-number">${userScore}</span>
          <span class="score-denom">/100 pts</span>
        </div>
        <h3 class="final-rating-title ${ratingClass}">${rating}</h3>
        <p class="final-guidance">${guidance}</p>

        <div class="action-buttons-group" style="margin-top: 1.5rem;">
          <a href="#affiliateStack" class="btn btn-primary">Review Recommended Protection Stack</a>
          <button type="button" id="restartQuizBtn" class="btn btn-secondary">Retake Assessment</button>
        </div>
      </div>
    `;

    const restartBtn = document.getElementById("restartQuizBtn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        currentIdx = 0;
        userScore = 0;
        renderQuestion(0);
      });
    }
  }

  // Start with first scenario
  renderQuestion(0);
}

/* ==========================================================================
   5. Interactive Incident Response Playbook (Saved to LocalStorage)
   ========================================================================== */
function initIncidentPlaybook() {
  const checkboxes = document.querySelectorAll(".incident-task-checkbox");
  const clearBtn = document.getElementById("resetPlaybookBtn");
  const progressText = document.getElementById("playbookProgressText");

  if (!checkboxes.length) return;

  const STORAGE_KEY = "scamshield_playbook_state";
  let savedState = {};

  try {
    savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    savedState = {};
  }

  // Apply saved state
  checkboxes.forEach(cb => {
    const taskId = cb.getAttribute("data-task-id");
    if (savedState[taskId]) {
      cb.checked = true;
      cb.closest(".playbook-step-card")?.classList.add("completed");
    }

    cb.addEventListener("change", () => {
      savedState[taskId] = cb.checked;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      } catch (e) {}

      if (cb.checked) {
        cb.closest(".playbook-step-card")?.classList.add("completed");
      } else {
        cb.closest(".playbook-step-card")?.classList.remove("completed");
      }
      updatePlaybookProgress();
    });
  });

  function updatePlaybookProgress() {
    const total = checkboxes.length;
    const completed = Object.values(savedState).filter(Boolean).length;
    if (progressText) {
      progressText.textContent = `${completed} of ${total} emergency actions completed`;
    }
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Reset your emergency checklist progress?")) {
        savedState = {};
        localStorage.removeItem(STORAGE_KEY);
        checkboxes.forEach(cb => {
          cb.checked = false;
          cb.closest(".playbook-step-card")?.classList.remove("completed");
        });
        updatePlaybookProgress();
      }
    });
  }

  updatePlaybookProgress();
}

/* ==========================================================================
   6. Cybersecurity Affiliate Defense Stack
   ========================================================================== */
function initAffiliateCards() {
  const container = document.getElementById("affiliateCardsRow");
  if (!container || !window.SITE_CONFIG || !window.SITE_CONFIG.affiliates) return;

  const affs = window.SITE_CONFIG.affiliates;
  const cardsHtml = Object.keys(affs).map(key => {
    const item = affs[key];
    return `
      <div class="affiliate-card">
        <div class="affiliate-card-badge">${item.badge}</div>
        <div class="affiliate-icon-box">🛡️</div>
        <h4 class="affiliate-name">${item.name}</h4>
        <p class="affiliate-tagline">${item.tagline}</p>
        <div class="affiliate-cta-box">
          <a href="${item.url}" target="_blank" rel="noopener sponsored" class="btn btn-affiliate">
            ${item.cta} &nearr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cardsHtml;
}

/* ==========================================================================
   7. Mobile Navigation & Smooth Scroll
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const navLinks = document.getElementById("primaryNavLinks");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll(".faq-item-header");
  headers.forEach(h => {
    h.addEventListener("click", () => {
      const parent = h.closest(".faq-item");
      if (parent) {
        parent.classList.toggle("active");
      }
    });
  });
}
