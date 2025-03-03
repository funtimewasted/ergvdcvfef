// Topics data structure for all subjects and semesters
const topicsData = {
    "english": {
        "first": {
            "title": "First Semester",
            "units": [
                {
                    "title": "Unit 1",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": [
                                {
                                    "question": "What literary device is used in the phrase 'the curtain of night fell'?",
                                    "options": ["Simile", "Metaphor", "Alliteration", "Hyperbole"],
                                    "answer": "Metaphor"
                                },
                                {
                                    "question": "The word 'ambiguous' most closely means:",
                                    "options": ["Clear", "Uncertain", "Definite", "Determined"],
                                    "answer": "Uncertain"
                                }
                            ]
                        },
                        {
                            "title": "Past&Present Tenses&Question Tags",
                            "questions": [
                                {
                                    "question": "Choose the correct present tense: 'She _____ to school every day.'",
                                    "options": ["go", "goes", "going", "went"],
                                    "answer": "goes"
                                },
                                {
                                    "question": "Which is the correct question tag? 'You're coming to the party, _____?'",
                                    "options": ["aren't you", "don't you", "isn't you", "won't you"],
                                    "answer": "aren't you"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Unit 2",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": [
                                {
                                    "question": "What is the main idea of the passage?",
                                    "options": ["Environmental protection", "Economic development", "Cultural heritage", "Political systems"],
                                    "answer": "Environmental protection"
                                }
                            ]
                        },
                        {
                            "title": "Future Forms",
                            "questions": [
                                {
                                    "question": "Which sentence uses the future perfect tense?",
                                    "options": [
                                        "I will study tomorrow.", 
                                        "I will be studying tomorrow.", 
                                        "I will have studied by tomorrow.",
                                        "I am going to study tomorrow."
                                    ],
                                    "answer": "I will have studied by tomorrow."
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Unit 3",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": [
                                {
                                    "question": "What type of text is this passage?",
                                    "options": ["Narrative", "Descriptive", "Persuasive", "Expository"],
                                    "answer": "Expository"
                                }
                            ]
                        },
                        {
                            "title": "Habits&Clauses",
                            "questions": [
                                {
                                    "question": "Which of the following is an adverb clause?",
                                    "options": [
                                        "The book that I read", 
                                        "When the sun rises", 
                                        "The tall building",
                                        "To swim quickly"
                                    ],
                                    "answer": "When the sun rises"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Unit 4",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "Narration&Inversion",
                            "questions": [{
    "type": "ordering",
    "question": "Arrange the steps to solve an algebraic equation in the correct order",
    "items": [
        "Combine like terms",
        "Divide both sides by the coefficient",
        "Isolate the variable term on one side",
        "Check your answer by substitution"
    ],
    "correctOrder": [2, 0, 1, 3]
}]
                        }
                    ]
                }
            ]
        },
        "second": {
            "title": "Second Semester",
            "units": [
                {
                    "title": "Unit 1",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "Modal&Related&Articles",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "Unit 2",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "Reported Speach&Reporting Verbs",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "Unit 3",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "The Passive",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "Unit 4",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "Conditionals&Modals",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "Unit 5",
                    "lessons": [
                        {
                            "title": "Reading and Vocabulary",
                            "questions": []
                        },
                        {
                            "title": "Modals&Clauses",
                            "questions": []
                        }
                    ]
                }
            ]
        }
    },
    "اللغة العربية": {
        "first": {
            "title": "الفصل الأول",
            "units": [
                {
                    "title": "الوحدة الأولى",
                    "lessons": [
                        {
                            "title": "من القيم الإنسانية في القرآن",
                            "questions": []
                        },
                        {
                            "title": "اسلوب الطلب وجوابه المجزوم والتشبيه المفرد",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثانية",
                    "lessons": [
                        {
                            "title": "عمانيات",
                            "questions": []
                        },
                        {
                            "title": "صور الفاعل والتشبيه التمثيلي",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثالثة",
                    "lessons": [
                        {
                            "title": "الزهايمر-الخرف المبكر",
                            "questions": []
                        },
                        {
                            "title": "صور المبتدأ والخبر والجملة الخبرية والإنشائية",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الرابعة",
                    "lessons": [
                        {
                            "title": "الإعلام ومشروع النهوض باللغة العربية",
                            "questions": []
                        },
                        {
                            "title": "المفعول معه والأمر",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الخامسة",
                    "lessons": [
                        {
                            "title": "التعليم التقني بوابة المستقبل في عالم متغير",
                            "questions": []
                        },
                        {
                            "title": "انواع ما والإستفهام",
                            "questions": []
                        }
                    ]
                }
            ]
        },
        "second": {
            "title": "الفصل الثاني",
            "units": [
                {
                    "title": "الوحدة الأولى",
                    "lessons": [
                        {
                            "title": "في فتح القدس",
                            "questions": []
                        },
                        {
                            "title": "معاني حروف الجر والتشخيص",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثانية",
                    "lessons": [
                        {
                            "title": "قصة-حفنة تمر",
                            "questions": []
                        },
                        {
                            "title": "اسم الفاعل واسم المفعول والطباق والمقابلة",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثالثة",
                    "lessons": [
                        {
                            "title": "شاعرات من بلدي",
                            "questions": []
                        },
                        {
                            "title": "اسم الزمان واسم المكان وجمع التكسير (القلة والكثرة)",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الرابعة",
                    "lessons": [
                        {
                            "title": "من مقامات بديع الزمان الهمذاني",
                            "questions": []
                        },
                        {
                            "title": "مصدر المرة ومصدر الهيئة والبحر المتدارك",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الخامسة",
                    "lessons": [
                        {
                            "title": "الذكاء الاصطناعي-عالم جديد",
                            "questions": []
                        },
                        {
                            "title": "اسم الآلة",
                            "questions": []
                        }
                    ]
                }
            ]
        }
    },
    "التاريخ": {
        "first": {
            "title": "الفصل الأول",
            "units": [
                {
                    "title": "الأردن في العصور القديمة",
                    "lessons": [
                        {
                            "title": "الأردن في العصور الحجرية",
                            "questions": []
                        },
                        {
                            "title": "الأردن في العصر الحديدي",
                            "questions": []
                        },
                        {
                            "title": "مملكة الأنباط",
                            "questions": []
                        },
                        {
                            "title": "مظاهر الحضارة اليونانية في الأردن",
                            "questions": []
                        },
                        {
                            "title": "مظاهر الحضارة الرومانية-البيزنطية في الأردن",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الأردن في صدر الإسلام",
                    "lessons": [
                        {
                            "title": "الأردن في صدر الإسلام",
                            "questions": []
                        },
                        {
                            "title": "الأردن في العصر الأموي",
                            "questions": []
                        },
                        {
                            "title": "الأردن في العصر العباسي",
                            "questions": []
                        },
                        {
                            "title": "الأردن خلال حملات الفرنجة",
                            "questions": []
                        },
                        {
                            "title": "الأردن في العصر الأيوبي",
                            "questions": []
                        },
                        {
                            "title": "الأردن في العصر المملوكي",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الأردن في العصر الحديث",
                    "lessons": [
                        {
                            "title": "الأوضاع السياسية والإدارية في الأردن في العهد العثماني",
                            "questions": []
                        },
                        {
                            "title": "الأوضاع الإجتماعية والإقتصادية الأردن في العهد العثماني",
                            "questions": []
                        },
                        {
                            "title": "الثورة العربية الكبرى",
                            "questions": []
                        },
                        {
                            "title": "الأردن في عهد المملكة العربية السورية والحكومات المحلية",
                            "questions": []
                        }
                    ]
                }
            ]
        },
        "second": {
            "title": "الفصل الثاني",
            "units": [
                {
                    "title": "الحياة السياسية في الأردن",
                    "lessons": [
                        {
                            "title": "تأسيس الإمارة الأردنية",
                            "questions": []
                        },
                        {
                            "title": "استقلال المملكة الأردنية الهاشمية",
                            "questions": []
                        },
                        {
                            "title": "تطور الحياة السياسية في الأردن بين عامي (1948-1957)",
                            "questions": []
                        },
                        {
                            "title": "تطور الحياة السياسية في الأردن بين عامي (1958-1999)",
                            "questions": []
                        },
                        {
                            "title": "الحياة السياسية في الأردن منذ 1999",
                            "questions": []
                        },
                        {
                            "title": "الأردن والعلاقات العربية والدولية",
                            "questions": []
                        },
                        {
                            "title": "القوات المسلحة الأردنية - الجيش العربي",
                            "questions": []
                        },
                        {
                            "title": "الأجهزة الأمنية الأردنية",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الحياة الاقتصادية في الأردن",
                    "lessons": [
                        {
                            "title": "الحياة الاقتصادية في الأردن بين عامي (1921-1950)",
                            "questions": []
                        },
                        {
                            "title": "الحياة الاقتصادية في الأردن بين عامي (1951-1967)",
                            "questions": []
                        },
                        {
                            "title": "الحياة الاقتصادية في الأردن بين عامي (1968-1999)",
                            "questions": []
                        },
                        {
                            "title": "الحياة الاقتصادية في الأردن منذ عام 1999",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الحياة الاجتماعية في الأردن",
                    "lessons": [
                        {
                            "title": "الحياة الاجتماعية في الأردن بين عامي (1921-1950)",
                            "questions": []
                        },
                        {
                            "title": "الحياة الاجتماعية في الأردن بين عامي (1951-1999)",
                            "questions": []
                        },
                        {
                            "title": "الحياة الاجتماعية في الأردن منذ عام 1999",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "التعليم والثقافة في الأردن",
                    "lessons": [
                        {
                            "title": "التعليم العام في الأردن بين عامي (1921-1950)",
                            "questions": []
                        },
                        {
                            "title": "التعليم العام في الأردن بين عامي (1951-1987)",
                            "questions": []
                        },
                        {
                            "title": "التعليم العام في الأردن بين عامي (1988-2024)",
                            "questions": []
                        },
                        {
                            "title": "التعليم العالي والبحث العلمي في الأردن منذ عام 1951",
                            "questions": []
                        },
                        {
                            "title": "الحياة الثقافية في الأردن في عهد الإمارة",
                            "questions": []
                        },
                        {
                            "title": "الحياة الثقافية في الأردن منذ عام 1946",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الأردن والقضية الفلسطينية",
                    "lessons": [
                        {
                            "title": "موقف الأردن من القضية الفلسطينية بين عامي (1916-1951)",
                            "questions": []
                        },
                        {
                            "title": "موقف الأردن من القضية الفلسطينية منذ عام 1951",
                            "questions": []
                        },
                        {
                            "title": "الوصاية والإعمار الهاشمي للمقدسات الدينية في القدس",
                            "questions": []
                        }
                    ]
                }
            ]
        }
    },
    "دين": {
        "first": {
            "title": "الفصل الأول",
            "units": [
                {
                    "title": "الوحدة الأولى",
                    "lessons": [
                        {
                            "title": "سورة آل عمران (102-105)",
                            "questions": []
                        },
                        {
                            "title": "حديث اتقاء الشبهات",
                            "questions": []
                        },
                        {
                            "title": "من صور الضلال",
                            "questions": []
                        },
                        {
                            "title": "كرامة الإنسان في الشريعة",
                            "questions": []
                        },
                        {
                            "title": "الزواج-مشروعيته ومقدماته",
                            "questions": []
                        },
                        {
                            "title": "الجهاد في الإسلام",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثانية",
                    "lessons": [
                        {
                            "title": "جهود علماء المسلمين في خدمة القرآن",
                            "questions": []
                        },
                        {
                            "title": "العزيمة والرخصة",
                            "questions": []
                        },
                        {
                            "title": "معركة مؤتة (8 هجري)",
                            "questions": []
                        },
                        {
                            "title": "المحرمات من النساء",
                            "questions": []
                        },
                        {
                            "title": "التعايش الإنساني",
                            "questions": []
                        },
                        {
                            "title": "الحقوق الإجتماعية للمرأة في الإسلام",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثالثة",
                    "lessons": [
                        {
                            "title": "سورة آل عمران (169-174)",
                            "questions": []
                        },
                        {
                            "title": "حديث - رضا الله تعالى",
                            "questions": []
                        },
                        {
                            "title": "فتح مكة (8 هجري)",
                            "questions": []
                        },
                        {
                            "title": "من خصائص الشريعة - الإيجابية",
                            "questions": []
                        },
                        {
                            "title": "شروط صحة عقد الزواج",
                            "questions": []
                        },
                        {
                            "title": "الحقوق المالية للمرأة في الإسلام",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الرابعة",
                    "lessons": [
                        {
                            "title": "سورة الروم (21-24)",
                            "questions": []
                        },
                        {
                            "title": "مكانة السنة النبوية في التشريع",
                            "questions": []
                        },
                        {
                            "title": "مراعاة الأعراف في الشريعة",
                            "questions": []
                        },
                        {
                            "title": "حقوق الزوجين",
                            "questions": []
                        },
                        {
                            "title": "تنظيم النسل وتحديده",
                            "questions": []
                        },
                        {
                            "title": "الأمن الغذائي في الإسلام",
                            "questions": []
                        },
                        {
                            "title": "الإسلام والوحدة الوطنية",
                            "questions": []
                        }
                    ]
                }
            ]
        },
        "second": {
            "title": "الفصل الثاني",
            "units": [
                {
                    "title": "الوحدة الأولى",
                    "lessons": [
                        {
                            "title": "سورة البقرة (284-286)",
                            "questions": []
                        },
                        {
                            "title": "دلائل وجود الله تعالى",
                            "questions": []
                        },
                        {
                            "title": "إعجاز القرآن الكريم",
                            "questions": []
                        },
                        {
                            "title": "الأمر بالمعروف والنهي عن المنكر",
                            "questions": []
                        },
                        {
                            "title": "اليوم الآخر - احداثه وآثار الإيمان به",
                            "questions": []
                        },
                        {
                            "title": "الإجتهاد في الإسلام",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثانية",
                    "lessons": [
                        {
                            "title": "سورة الأعراف (31-34)",
                            "questions": []
                        },
                        {
                            "title": "مراعاة المصالح في الشريعة",
                            "questions": []
                        },
                        {
                            "title": "جهود علماء المسلمين في الحفاظ على السنة النبوية",
                            "questions": []
                        },
                        {
                            "title": "حديث - منهج الإسلام في الحياة",
                            "questions": []
                        },
                        {
                            "title": "رسائل النبي الى الملوك والزعماء في عصره",
                            "questions": []
                        },
                        {
                            "title": "يوم تبوك (9 هجري)",
                            "questions": []
                        },
                        {
                            "title": "الحقوق السياسية للمرأة في الإسلام",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الثالثة",
                    "lessons": [
                        {
                            "title": "سورة الفرقان (63-77)",
                            "questions": []
                        },
                        {
                            "title": "الطلاق",
                            "questions": []
                        },
                        {
                            "title": "العدة",
                            "questions": []
                        },
                        {
                            "title": "الوصية في الشريعة",
                            "questions": []
                        },
                        {
                            "title": "الميراث في الشريعة",
                            "questions": []
                        },
                        {
                            "title": "من خصائص الشريعة - الوسطية",
                            "questions": []
                        },
                        {
                            "title": "مجالات الوقف ودورها في التنمية",
                            "questions": []
                        }
                    ]
                },
                {
                    "title": "الوحدة الرابعة",
                    "lessons": [
                        {
                            "title": "حديث - مفهوم الإفلاس بين الدنيا والآخرة",
                            "questions": []
                        },
                        {
                            "title": "مقاصد الشريعة",
                            "questions": []
                        },
                        {
                            "title": "منهج الإسلام في مكافحة الجريمة",
                            "questions": []
                        },
                        {
                            "title": "من وصايا النبي في حجة الوداع",
                            "questions": []
                        },
                        {
                            "title": "المسؤولية المجتمعية في الإسلام",
                            "questions": []
                        },
                        {
                            "title": "حقوق الإنسان بين الإسلام والإعلان العالمي لحقوق الإنسان",
                            "questions": []
                        }
                    ]
                }
            ]
        }
    }
};



// Function to generate HTML for a semester's content
function generateSemesterContent(subject, semester) {
    const semesterData = topicsData[subject][semester];
    if (!semesterData) return '';
    
    let html = `<div id="${subject}-${semester}" class="semester-content">`;
    
    // Generate HTML for each unit
    semesterData.units.forEach(unit => {
        html += `
            <div class="unit-container">
                <div class="unit-title">${unit.title}</div>
                <div class="section">
        `;
        
        // Generate HTML for each lesson
        unit.lessons.forEach(lesson => {
            html += `
                <div class="section-content" data-subject="${subject}" data-unit="${unit.title}" data-lesson="${lesson.title}">
                    ${lesson.title}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    return html;
}

// Generate content for all subjects and semesters
function generateAllContent() {
    let contentHTML = '';
    
    // Loop through all subjects
    for (const subject in topicsData) {
        // Generate HTML for first semester
        if (topicsData[subject].first) {
            contentHTML += generateSemesterContent(subject, 'first');
        }
        
        // Generate HTML for second semester
        if (topicsData[subject].second) {
            contentHTML += generateSemesterContent(subject, 'second');
        }
    }
    
    document.getElementById('content').innerHTML = contentHTML;
}

// Initialize content when the page loads
document.addEventListener('DOMContentLoaded', function() {
    generateAllContent();
    updateContent(); // Show default content
});

// Function to get questions for a specific lesson
function getQuestions(subject, unitTitle, lessonTitle) {
    const activeSemester = document.querySelector('.semester-btn.active').dataset.semester;
    
    // Navigate through the data structure to find the questions
    if (topicsData[subject] && 
        topicsData[subject][activeSemester] && 
        topicsData[subject][activeSemester].units) {
        
        const unit = topicsData[subject][activeSemester].units.find(u => u.title === unitTitle);
        if (unit && unit.lessons) {
            const lesson = unit.lessons.find(l => l.title === lessonTitle);
            if (lesson && lesson.questions) {
                return lesson.questions;
            }
        }
    }
    
    return [];
}