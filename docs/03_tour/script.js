const startButton = document.querySelector("#startTourButton");
const tourPanel = document.querySelector("#tourPanel");
const progressText = document.querySelector("#tourProgress");
const messageText = document.querySelector("#tourMessage");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const closeButton = document.querySelector("#closeButton");

const activeClass = "is-active";
let currentStepIndex = 0;

const steps = [
  {
    selector: "#search",
    message: "Use search to find the report you need.",
  },
  {
    selector: "#sales",
    message: "This card shows the main sales number.",
  },
  {
    selector: "#chart",
    message: "The chart gives you a quick view of the trend.",
  },
  {
    selector: "#orders",
    message: "Recent orders help you check new activity.",
  },
  {
    selector: "#settings",
    message: "Settings let you choose how reports are sent.",
  },
];

const clearActiveTarget = () => {
  document.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
};

const endTour = async () => {
  clearActiveTarget();
  tourPanel.close();
  await window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
  startButton.removeAttribute("disabled");
  progressText.textContent = "";
  messageText.textContent = "";
};

const showStep = async (stepIndex) => {
  const step = steps[stepIndex];
  const target = document.querySelector(step.selector);

  clearActiveTarget();
  if (!tourPanel.open) {
    tourPanel.show();
  }

  await target.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  target.classList.add(activeClass);
  currentStepIndex = stepIndex;

  progressText.textContent = `Step ${stepIndex + 1} of ${steps.length}`;
  messageText.textContent = step.message;
  backButton.disabled = stepIndex === 0;
  nextButton.textContent = stepIndex === steps.length - 1 ? "Finish" : "Next";
};

startButton.addEventListener("click", () => {
  startButton.setAttribute("disabled", true);
  showStep(0);
});

backButton.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    showStep(currentStepIndex - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentStepIndex === steps.length - 1) {
    endTour();
    return;
  }

  showStep(currentStepIndex + 1);
});

closeButton.addEventListener("click", () => {
  endTour();
});
