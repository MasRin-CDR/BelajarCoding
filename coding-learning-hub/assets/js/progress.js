(function () {
  const STORAGE_KEY = "codingLearningHubState";

  function getDefaultState() {
    return {
      theme: "dark",
      completedItems: {},
      quizScores: {},
      playgroundDrafts: {}
    };
  }

  function readState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return getDefaultState();
      }

      const parsed = JSON.parse(raw);
      return {
        ...getDefaultState(),
        ...parsed,
        completedItems: parsed.completedItems || {},
        quizScores: parsed.quizScores || {},
        playgroundDrafts: parsed.playgroundDrafts || {}
      };
    } catch (error) {
      console.warn("Gagal membaca progress dari localStorage:", error.message);
      return getDefaultState();
    }
  }

  function writeState(nextState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      return true;
    } catch (error) {
      console.warn("Gagal menyimpan progress ke localStorage:", error.message);
      return false;
    }
  }

  function getState() {
    return readState();
  }

  function updateState(updater) {
    const current = readState();
    const nextState = typeof updater === "function" ? updater(current) : current;
    writeState(nextState);
    return nextState;
  }

  function setTheme(theme) {
    const safeTheme = theme === "light" ? "light" : "dark";
    updateState((current) => ({ ...current, theme: safeTheme }));
    return safeTheme;
  }

  function toggleCompletedItem(itemId, isCompleted) {
    return updateState((current) => {
      const completedItems = { ...current.completedItems };
      if (isCompleted) {
        completedItems[itemId] = true;
      } else {
        delete completedItems[itemId];
      }

      return {
        ...current,
        completedItems
      };
    });
  }

  function saveQuizScore(moduleId, score, total) {
    const safeScore = Number.isFinite(score) ? Math.max(0, score) : 0;
    const safeTotal = Number.isFinite(total) ? Math.max(1, total) : 1;

    return updateState((current) => ({
      ...current,
      quizScores: {
        ...current.quizScores,
        [moduleId]: {
          score: safeScore,
          total: safeTotal,
          updatedAt: new Date().toISOString()
        }
      }
    }));
  }

  function savePlaygroundDraft(language, value) {
    if (!language) {
      return getState();
    }

    return updateState((current) => ({
      ...current,
      playgroundDrafts: {
        ...current.playgroundDrafts,
        [language]: value
      }
    }));
  }

  function clearPlaygroundDraft(language) {
    if (!language) {
      return getState();
    }

    return updateState((current) => {
      const drafts = { ...current.playgroundDrafts };
      delete drafts[language];

      return {
        ...current,
        playgroundDrafts: drafts
      };
    });
  }

  function getModuleProgress(moduleId) {
    const data = window.CodingHubData;
    const state = readState();
    const module = data?.moduleLookup?.[moduleId];

    if (!module) {
      return {
        completed: 0,
        total: 0,
        percentage: 0
      };
    }

    const completed = module.checklist.filter((item) => Boolean(state.completedItems[item.id])).length;
    const total = module.checklist.length;

    return {
      completed,
      total,
      percentage: total ? Math.round((completed / total) * 100) : 0
    };
  }

  function getSummary() {
    const data = window.CodingHubData;
    const state = readState();
    const modules = data?.modules || [];
    const allChecklistIds = modules.flatMap((module) => module.checklist.map((item) => item.id));
    const totalTasks = allChecklistIds.length;
    const completedTasks = allChecklistIds.filter((id) => Boolean(state.completedItems[id])).length;
    const modulesStarted = modules.filter((module) => getModuleProgress(module.id).completed > 0).length;
    const modulesCompleted = modules.filter((module) => getModuleProgress(module.id).percentage === 100).length;
    const quizEntries = Object.values(state.quizScores);
    const quizAverage = quizEntries.length
      ? Math.round(
          quizEntries.reduce((accumulator, item) => accumulator + (item.score / item.total) * 100, 0) / quizEntries.length
        )
      : 0;

    return {
      totalTasks,
      completedTasks,
      overallPercentage: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
      modulesStarted,
      modulesCompleted,
      quizAverage,
      quizCount: quizEntries.length
    };
  }

  window.CodingHubProgress = {
    getState,
    setTheme,
    toggleCompletedItem,
    getModuleProgress,
    getSummary,
    saveQuizScore,
    savePlaygroundDraft,
    clearPlaygroundDraft
  };
})();
