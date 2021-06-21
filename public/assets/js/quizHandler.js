const handleQuizSearch = async (event) => {
  event.preventDefault();

  const searchQuery = $("#searchQuery").val();

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    query: JSON.stringify({
      title: searchQuery,
    }),
  };

  const response = await fetch("/api/quiz/search", options);

  if (response.status !== 200) {
    console.log("Failed to search!");
  } else {
    window.location.replace(`/quiz/search?title=${searchQuery}`);
  }
};

const createQuizBase = async (event) => {
  event.preventDefault();

  const title = $("#quiz-title").val();
  const category_id = $("#category-select").val();
  const difficulty = $("#difficulty-select").val();
  const type = $("#type-select").val();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      title,
      category_id,
      difficulty,
      type,
    }),
  };

  const response = await fetch("/api/quiz/create", options);

  if (response.status !== 201) {
    console.log("Failed to create quiz!");
  } else {
    window.location.replace(`/quiz/create/question`);
  }
};

const createQuizQuestion = async (event) => {
  event.preventDefault();

  const question = $("#question").val();
  const correct_option = $("#correct-option").val();
  const option2 = $("#option2").val();
  const option3 = $("#option3").val();
  const option4 = $("#option4").val();

  const answersArray = [];

  answersArray.push(correct_option, option2, option3, option4);

  const questionOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      question,
      correct_option,
    }),
  };

  const createAnswerOption = async (option) => {
    const answersOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        option,
      }),
    };

    const response = await fetch(
      "/api/quiz/create/question/answer",
      answersOptions
    );
  };

  const response = await fetch("/api/quiz/create/question", questionOptions);

  answersArray.map((each) => createAnswerOption(each));

  if (response.status !== 201) {
    console.log("Failed to create quiz!");
  } else {
    window.location.replace(`/quiz/create/question`);
  }
};

const finishCreateQuiz = (event) => {
  event.preventDefault();

  window.location.replace(`/quiz`);
};

const viewQuiz = async (event) => {
  const id = event.currentTarget.id;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    params: JSON.stringify({
      id,
    }),
  };
  const response = await fetch(`/api/quiz/${id}`, options);
  if (response.status !== 200) {
    console.log("Failed to get quiz");
  } else {
    window.location.replace(`/quiz/${id}`);
  }
};

$(".view-quiz").click(viewQuiz);
$("#quizSearch").submit(handleQuizSearch);
$("#create-quiz-form").submit(createQuizBase);
$("#questionForm").submit(createQuizQuestion);
$("#doneCreate").click(finishCreateQuiz);
