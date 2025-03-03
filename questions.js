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
            displayQuestions(subject, unit, lesson, questions);
        } else {
            // No questions found for this lesson
            showError(subject, unit, lesson);
        }
    } catch (error) {
        console.error("Error handling section click:", error);
        showError(subject, unit, lesson);
    }
}

function displayQuestions(subject, unit, lesson, questions) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');

    modalTitle.textContent = `${subject} - ${unit} - ${lesson}`;
    questionContent.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        
        // Check if it's a matching question
        if (question.type === 'matching') {
            questionDiv.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <div class="matching-container" id="matching-${index}">
                    <p class="matching-instruction">Drag items from the right column to match with items in the left column</p>
                    <div class="matching-items">
                        <div class="matching-column left-column">
                            ${question.pairs.map((pair, pairIndex) => `
                                <div class="matching-item left-item" data-index="${pairIndex}">${pair.left}</div>
                            `).join('')}
                        </div>
                        <div class="matching-column right-column">
                            <div class="matching-answers">
                                ${shuffleArray([...question.pairs]).map((pair, pairIndex) => `
                                    <div class="matching-item right-item" draggable="true" data-answer-index="${pairIndex}" data-value="${pair.right}">${pair.right}</div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="matching-feedback"></div>
                    <div class="matching-btn-container">
                        <button class="btn matching-reset-btn" data-index="${index}">Reset</button>
                        <button class="btn matching-check-btn" data-index="${index}">Check Answers</button>
                    </div>
                </div>
            `;
        } else {
            // Regular multiple choice question
            questionDiv.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                ${question.options ? `
                    <ul>
                        ${question.options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                ` : ''}
                <p><strong>Answer:</strong> ${question.answer}</p>
            `;
        }
        
        questionContent.appendChild(questionDiv);
    });

    modal.style.display = 'block';
    
    // Initialize drag and drop functionality for matching questions
    initializeMatchingQuestions(questions);
}

function initializeMatchingQuestions(questions) {
    // Find all matching questions
    questions.forEach((question, questionIndex) => {
        if (question.type === 'matching') {
            const matchingContainer = document.getElementById(`matching-${questionIndex}`);
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
                } else {
                    feedbackDiv.innerHTML = 'Some matches are incorrect. Try again.';
                    feedbackDiv.className = 'matching-feedback error';
                }
            });
        }
    });
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

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}