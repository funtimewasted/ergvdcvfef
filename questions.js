// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for subject buttons
    document.querySelectorAll('.nav-btn[data-subject]').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all subject buttons
            document.querySelectorAll('.nav-btn[data-subject]').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            updateContent();
        });
    });

    // Add event listeners for semester buttons
    document.querySelectorAll('.semester-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all semester buttons
            document.querySelectorAll('.semester-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            updateContent();
        });
    });

    // Set up content and attach event listeners
    updateContent();
});

// Global variables for quiz tracking
let quizState = {
    currentQuestionIndex: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    startTime: null,
    endTime: null,
    selectedAnswers: [],
    questions: [],
    subject: '',
    unit: '',
    lesson: ''
};

function updateContent() {
    // Get active subject and semester
    const activeSubject = document.querySelector('.nav-btn[data-subject].active').dataset.subject;
    const activeSemester = document.querySelector('.semester-btn.active').dataset.semester;
    
    // Hide all content
    document.querySelectorAll('.semester-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    const contentId = `${activeSubject}-${activeSemester}`;
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        contentElement.classList.add('active');
    }
    
    // Add click handlers to all section-content elements
    document.querySelectorAll('.section-content').forEach(section => {
        section.addEventListener('click', function() {
            const subject = this.dataset.subject;
            const unit = this.dataset.unit;
            const lesson = this.dataset.lesson;
            
            handleSectionClick(subject, unit, lesson);
        });
    });
}

function handleSectionClick(subject, unit, lesson) {
    try {
        // Get the questions for this lesson from the data structure
        const questions = getQuestions(subject, unit, lesson);
        
        if (questions && questions.length > 0) {
            startQuiz(subject, unit, lesson, questions);
        } else {
            // No questions found for this lesson
            showError(subject, unit, lesson);
        }
    } catch (error) {
        console.error("Error handling section click:", error);
        showError(subject, unit, lesson);
    }
}

function startQuiz(subject, unit, lesson, questions) {
    // Reset quiz state
    quizState = {
        currentQuestionIndex: 0,
        correctAnswers: 0,
        totalQuestions: questions.length,
        startTime: new Date(),
        endTime: null,
        selectedAnswers: new Array(questions.length).fill(null),
        questions: questions,
        subject: subject,
        unit: unit,
        lesson: lesson
    };

    // Display the first question
    displayQuestion();

    // Show the modal
    const modal = document.getElementById('questionModal');
    modal.style.display = 'block';
}

function displayQuestion() {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    modalTitle.textContent = `${quizState.subject} - ${quizState.unit} - ${quizState.lesson}`;
    
    // Clear previous content
    questionContent.innerHTML = '';
    
    // Check if it's a matching question
    if (currentQuestion.type && currentQuestion.type === 'matching') {
        displayMatchingQuestion(questionContent, currentQuestion);
    } else {
        // Default to multiple choice if no type specified or type is not 'matching'
        displayMultipleChoiceQuestion(questionContent, currentQuestion);
    }
}

function displayMultipleChoiceQuestion(container, question) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-container';
    
    // Question number and progress
    const progressText = document.createElement('div');
    progressText.className = 'question-progress';
    progressText.textContent = `Question ${quizState.currentQuestionIndex + 1} of ${quizState.totalQuestions}`;
    questionDiv.appendChild(progressText);
    
    // Question text
    const questionText = document.createElement('p');
    questionText.className = 'question-text';
    questionText.innerHTML = `<strong>Question:</strong> ${question.question}`;
    questionDiv.appendChild(questionText);
    
    // Options container
    if (question.options && question.options.length > 0) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container';
        
        question.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'option-label';
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question-option';
            optionInput.value = index;
            optionInput.className = 'option-input';
            
            // Add change event listener to enable submit button when an option is selected
            optionInput.addEventListener('change', function() {
                document.querySelector('.submit-btn').disabled = false;
            });
            
            // Check if this option was previously selected
            if (quizState.selectedAnswers[quizState.currentQuestionIndex] === index) {
                optionInput.checked = true;
            }
            
            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
            optionsDiv.appendChild(optionLabel);
        });
        
        questionDiv.appendChild(optionsDiv);
    }
    
    // Feedback section (initially hidden)
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-container hidden';
    feedbackDiv.id = 'feedback';
    questionDiv.appendChild(feedbackDiv);
    
    // Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'quiz-buttons';
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn submit-btn';
    submitBtn.textContent = 'Submit Answer';
    submitBtn.onclick = checkAnswer;
    // Disable submit button if no answer is selected yet
    submitBtn.disabled = quizState.selectedAnswers[quizState.currentQuestionIndex] === null;
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn next-btn hidden';
    nextBtn.textContent = quizState.currentQuestionIndex === quizState.totalQuestions - 1 ? 'See Results' : 'Next Question';
    nextBtn.onclick = nextQuestion;
    
    buttonsDiv.appendChild(submitBtn);
    buttonsDiv.appendChild(nextBtn);
    questionDiv.appendChild(buttonsDiv);
    
    container.appendChild(questionDiv);
}

function displayMatchingQuestion(container, question) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-container';
    
    // Question number and progress
    const progressText = document.createElement('div');
    progressText.className = 'question-progress';
    progressText.textContent = `Question ${quizState.currentQuestionIndex + 1} of ${quizState.totalQuestions}`;
    questionDiv.appendChild(progressText);
    
    // Question text
    const questionText = document.createElement('p');
    questionText.className = 'question-text';
    questionText.innerHTML = `<strong>Question:</strong> ${question.question}`;
    questionDiv.appendChild(questionText);
    
    // Create matching container
    const matchingContainer = document.createElement('div');
    matchingContainer.className = 'matching-container';
    matchingContainer.id = `matching-${quizState.currentQuestionIndex}`;
    
    // Add instruction
    const instruction = document.createElement('p');
    instruction.className = 'matching-instruction';
    instruction.textContent = 'Drag items from the right column to match with items in the left column';
    matchingContainer.appendChild(instruction);
    
    // Create matching items container
    const matchingItems = document.createElement('div');
    matchingItems.className = 'matching-items';
    
    // Left column (fixed items)
    const leftColumn = document.createElement('div');
    leftColumn.className = 'matching-column left-column';
    
    question.pairs.forEach((pair, pairIndex) => {
        const leftItem = document.createElement('div');
        leftItem.className = 'matching-item left-item';
        leftItem.dataset.index = pairIndex;
        leftItem.textContent = pair.left;
        leftColumn.appendChild(leftItem);
    });
    
    // Right column (draggable answers)
    const rightColumn = document.createElement('div');
    rightColumn.className = 'matching-column right-column';
    
    const matchingAnswers = document.createElement('div');
    matchingAnswers.className = 'matching-answers';
    
    // Shuffle the pairs for the right column
    const shuffledPairs = [...question.pairs];
    shuffleArray(shuffledPairs);
    
    shuffledPairs.forEach((pair, pairIndex) => {
        const rightItem = document.createElement('div');
        rightItem.className = 'matching-item right-item';
        rightItem.draggable = true;
        rightItem.dataset.answerIndex = pairIndex;
        rightItem.dataset.value = pair.right;
        rightItem.textContent = pair.right;
        matchingAnswers.appendChild(rightItem);
    });
    
    rightColumn.appendChild(matchingAnswers);
    
    // Add columns to the matching items container
    matchingItems.appendChild(leftColumn);
    matchingItems.appendChild(rightColumn);
    matchingContainer.appendChild(matchingItems);
    
    // Add feedback div
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'matching-feedback';
    matchingContainer.appendChild(feedbackDiv);
    
    // Add buttons container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'matching-btn-container';
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn matching-reset-btn';
    resetBtn.dataset.index = quizState.currentQuestionIndex;
    resetBtn.textContent = 'Reset';
    
    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn matching-check-btn';
    checkBtn.dataset.index = quizState.currentQuestionIndex;
    checkBtn.textContent = 'Check Answers';
    
    btnContainer.appendChild(resetBtn);
    btnContainer.appendChild(checkBtn);
    matchingContainer.appendChild(btnContainer);
    
    // Add next button container
    const nextBtnContainer = document.createElement('div');
    nextBtnContainer.className = 'quiz-buttons';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn next-btn hidden';
    nextBtn.textContent = quizState.currentQuestionIndex === quizState.totalQuestions - 1 ? 'See Results' : 'Next Question';
    nextBtn.onclick = nextQuestion;
    
    nextBtnContainer.appendChild(nextBtn);
    
    // Add everything to the question div
    questionDiv.appendChild(matchingContainer);
    questionDiv.appendChild(nextBtnContainer);
    
    container.appendChild(questionDiv);
    
    // Initialize drag and drop functionality
    initializeMatchingQuestion(question);
}

function initializeMatchingQuestion(question) {
    const matchingContainer = document.getElementById(`matching-${quizState.currentQuestionIndex}`);
    if (!matchingContainer) return;
    
    const draggableItems = matchingContainer.querySelectorAll('.right-item');
    const leftItems = matchingContainer.querySelectorAll('.left-item');
    const resetBtn = matchingContainer.querySelector('.matching-reset-btn');
    const checkBtn = matchingContainer.querySelector('.matching-check-btn');
    const feedbackDiv = matchingContainer.querySelector('.matching-feedback');
    
    // Store the correct answers for checking later
    const correctAnswers = question.pairs.map(pair => pair.right);
    
    // Add event listeners for draggable items
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.answerIndex);
            e.target.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Add event listeners for left items (drop targets)
    leftItems.forEach(item => {
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('highlight');
        });
        
        item.addEventListener('dragleave', function() {
            this.classList.remove('highlight');
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('highlight');
            
            const draggedItemIndex = e.dataTransfer.getData('text/plain');
            const draggedItem = matchingContainer.querySelector(`.right-item[data-answer-index="${draggedItemIndex}"]`);
            
            if (draggedItem) {
                // Clear any previous matches for this target
                const previousMatch = this.querySelector('.right-item');
                if (previousMatch) {
                    previousMatch.remove();
                }
                
                // Add the dragged item to this drop target
                const clonedItem = draggedItem.cloneNode(true);
                this.appendChild(clonedItem);
                
                // Hide the original
                draggedItem.style.display = 'none';
            }
        });
    });
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        // Reset feedback
        feedbackDiv.innerHTML = '';
        feedbackDiv.className = 'matching-feedback';
        
        // Remove all matched items
        leftItems.forEach(item => {
            const matchedItem = item.querySelector('.right-item');
            if (matchedItem) {
                matchedItem.remove();
            }
            item.classList.remove('matched', 'incorrect');
        });
        
        // Show all original draggable items
        draggableItems.forEach(item => {
            item.style.display = 'block';
        });
    });
    
    // Check answers button functionality
    checkBtn.addEventListener('click', function() {
        let allCorrect = true;
        let matchedCount = 0;
        
        leftItems.forEach((item, index) => {
            const matchedItem = item.querySelector('.right-item');
            
            if (matchedItem) {
                matchedCount++;
                const userAnswer = matchedItem.getAttribute('data-value');
                const correctAnswer = correctAnswers[index];
                
                if (userAnswer === correctAnswer) {
                    item.classList.add('matched');
                    item.classList.remove('incorrect');
                } else {
                    item.classList.add('incorrect');
                    item.classList.remove('matched');
                    allCorrect = false;
                }
            } else {
                allCorrect = false;
            }
        });
        
        // Show feedback
        if (matchedCount === 0) {
            feedbackDiv.innerHTML = 'Please match some items before checking.';
            feedbackDiv.className = 'matching-feedback error';
        } else if (matchedCount < leftItems.length) {
            feedbackDiv.innerHTML = 'Please match all items before checking.';
            feedbackDiv.className = 'matching-feedback error';
        } else if (allCorrect) {
            feedbackDiv.innerHTML = 'Correct! All matches are correct.';
            feedbackDiv.className = 'matching-feedback success';
            
            // Update quiz state
            quizState.correctAnswers++;
            
            // Show next button
            document.querySelector('.next-btn').classList.remove('hidden');
        } else {
            feedbackDiv.innerHTML = 'Some matches are incorrect. Try again.';
            feedbackDiv.className = 'matching-feedback error';
        }
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="question-option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }
    
    const selectedIndex = parseInt(selectedOption.value);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    
    // Store the selected answer
    quizState.selectedAnswers[quizState.currentQuestionIndex] = selectedIndex;
    
    // Determine if the answer is correct
    const correctOptionText = currentQuestion.answer;
    const isCorrect = currentQuestion.options[selectedIndex] === correctOptionText;
    
    if (isCorrect) {
        quizState.correctAnswers++;
    }
    
    // Show feedback
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.classList.remove('hidden');
    feedbackDiv.innerHTML = isCorrect 
        ? '<div class="correct-feedback">Correct! ✓</div>' 
        : `<div class="incorrect-feedback">Incorrect. The correct answer is: ${correctOptionText}</div>`;
    
    // Disable radio buttons
    document.querySelectorAll('input[name="question-option"]').forEach(input => {
        input.disabled = true;
    });
    
    // Highlight the selected option
    const optionLabels = document.querySelectorAll('.option-label');
    optionLabels.forEach((label, index) => {
        if (index === selectedIndex) {
            label.classList.add(isCorrect ? 'correct-option' : 'incorrect-option');
        } else if (currentQuestion.options[index] === correctOptionText) {
            label.classList.add('correct-option');
        }
    });
    
    // Hide submit button and show next button
    document.querySelector('.submit-btn').classList.add('hidden');
    document.querySelector('.next-btn').classList.remove('hidden');
}

function nextQuestion() {
    quizState.currentQuestionIndex++;
    
    if (quizState.currentQuestionIndex < quizState.totalQuestions) {
        displayQuestion();
    } else {
        // End of quiz
        quizState.endTime = new Date();
        displayResults();
    }
}

function displayResults() {
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');
    
    modalTitle.textContent = 'Quiz Results';
    
    // Calculate time taken
    const timeTaken = (quizState.endTime - quizState.startTime) / 1000; // in seconds
    const minutes = Math.floor(timeTaken / 60);
    const seconds = Math.floor(timeTaken % 60);
    
    // Calculate score percentage
    const scorePercentage = (quizState.correctAnswers / quizState.totalQuestions) * 100;
    
    // Determine performance message
    let performanceMessage = '';
    if (scorePercentage >= 90) {
        performanceMessage = 'Excellent job! 🎉';
    } else if (scorePercentage >= 70) {
        performanceMessage = 'Good work! 👍';
    } else if (scorePercentage >= 50) {
        performanceMessage = 'Not bad. Keep practicing! 💪';
    } else {
        performanceMessage = 'You might need more study time. 📚';
    }
    
    // Build results container
    questionContent.innerHTML = '';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results-container';
    
    resultsDiv.innerHTML = `
        <h2 class="results-header">${performanceMessage}</h2>
        <div class="results-score">
            <div class="score-circle">
                <span class="score-number">${scorePercentage.toFixed(0)}%</span>
            </div>
        </div>
        <div class="results-details">
            <p><strong>Subject:</strong> ${quizState.subject}</p>
            <p><strong>Unit:</strong> ${quizState.unit}</p>
            <p><strong>Lesson:</strong> ${quizState.lesson}</p>
            <p><strong>Correct Answers:</strong> ${quizState.correctAnswers} out of ${quizState.totalQuestions}</p>
            <p><strong>Time Taken:</strong> ${minutes}m ${seconds}s</p>
        </div>
        
        <div class="results-actions">
            <button class="btn review-btn">Review Answers</button>
            <button class="btn close-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    
    questionContent.appendChild(resultsDiv);
    
    // Add event listener for review button
    document.querySelector('.review-btn').addEventListener('click', reviewAnswers);
}

function reviewAnswers() {
    const questionContent = document.getElementById('questionContent');
    
    // Build review container
    questionContent.innerHTML = '';
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-container';
    
    // Add a back to results button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn back-btn';
    backBtn.textContent = 'Back to Results';
    backBtn.addEventListener('click', displayResults);
    reviewDiv.appendChild(backBtn);
    
    // Display each question with the user's answer
    quizState.questions.forEach((question, index) => {
        const questionReview = document.createElement('div');
        questionReview.className = 'question-review';
        
        // For matching questions
        if (question.type === 'matching') {
            const isCorrect = index < quizState.correctAnswers; // This is simplistic; ideally track per-question results
            questionReview.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            questionReview.innerHTML = `
                <div class="review-question-header">
                    <span class="review-question-number">Question ${index + 1}</span>
                    <span class="review-status">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <p class="review-question-text">${question.question}</p>
                <div class="review-matching">
                    <p><strong>Correct matches:</strong></p>
                    <ul class="matching-review-list">
                        ${question.pairs.map(pair => `
                            <li>${pair.left} → ${pair.right}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            // Regular multiple choice questions
            const selectedAnswer = quizState.selectedAnswers[index];
            const isCorrect = selectedAnswer !== null && question.options[selectedAnswer] === question.answer;
            questionReview.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            questionReview.innerHTML = `
                <div class="review-question-header">
                    <span class="review-question-number">Question ${index + 1}</span>
                    <span class="review-status">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <p class="review-question-text">${question.question}</p>
                <div class="review-answers">
                    <p><strong>Your answer:</strong> ${selectedAnswer !== null ? question.options[selectedAnswer] : 'No answer selected'}</p>
                    <p><strong>Correct answer:</strong> ${question.answer}</p>
                </div>
            `;
        }
        
        reviewDiv.appendChild(questionReview);
    });
    
    questionContent.appendChild(reviewDiv);
}

function showError(subject, unit, lesson) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');

    modalTitle.textContent = 'No Questions Found';
    questionContent.innerHTML = `
        <div class="error-message">
            No questions available yet for ${subject} - ${unit} - ${lesson}
        </div>
        <div class="add-question-prompt">
            <p>Would you like to add questions for this topic?</p>
            <button class="btn add-question-btn">Add Questions</button>
        </div>
    `;

    modal.style.display = 'block';
    
    // Optionally add event listener for the Add Questions button
    const addBtn = questionContent.querySelector('.add-question-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // This could open a form to add new questions
            alert('Question creation feature coming soon!');
        });
    }
}

function closeModal() {
    document.getElementById('questionModal').style.display = 'none';
}

// Function to get questions for a specific lesson
function getQuestions(subject, unitTitle, lessonTitle) {
    // Find the active semester
    const activeSemester = document.querySelector('.semester-btn.active').dataset.semester;
    
    // Navigate through the data structure to find matching questions
    try {
        const semesterData = topicsData[subject][activeSemester];
        const unit = semesterData.units.find(u => u.title === unitTitle);
        if (!unit) return null;
        
        const lesson = unit.lessons.find(l => {
            // Handle both string and object lessons
            if (typeof l === 'string') {
                return l === lessonTitle;
            } else {
                return l.title === lessonTitle;
            }
        });
        
        if (!lesson || typeof lesson === 'string') return null;
        
        return lesson.questions || [];
    } catch (error) {
        console.error("Error finding questions:", error);
        return [];
    }
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
