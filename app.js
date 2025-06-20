// ADHD Nutrition Guide - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initTabs();
    initAssessment();
    initSymptomTracker();
    initRangeInputs();
    initQuickLinks();
});

// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            updateActiveNav(this);
        });
    });
    
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    function updateActiveNav(activeItem) {
        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        activeItem.classList.add('active');
    }
}

// Quick Links Functionality
function initQuickLinks() {
    const quickLinkButtons = document.querySelectorAll('.quick-link-buttons .btn');
    
    quickLinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetNavItem = document.querySelector(`[data-section="${targetSection}"]`);
            
            if (targetNavItem) {
                targetNavItem.click();
            }
        });
    });
}

// Tab System for Nutrition Section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
            updateActiveTab(this);
        });
    });
    
    function showTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show target tab
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    function updateActiveTab(activeButton) {
        // Remove active class from all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
    }
}

// Diet Assessment System
function initAssessment() {
    const assessmentForm = document.getElementById('dietAssessment');
    const resultDiv = document.getElementById('assessmentResult');
    const resultText = document.getElementById('resultText');
    const recommendations = document.getElementById('recommendations');
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateAssessment();
        });
    }
    
    function calculateAssessment() {
        const formData = new FormData(assessmentForm);
        let totalScore = 0;
        let maxScore = 12; // 4 questions, max 3 points each
        
        // Calculate total score
        for (let value of formData.values()) {
            totalScore += parseInt(value);
        }
        
        // Calculate percentage
        const percentage = Math.round((totalScore / maxScore) * 100);
        
        // Generate result
        let resultCategory, resultMessage, recommendationsList;
        
        if (percentage >= 80) {
            resultCategory = 'ممتاز';
            resultMessage = `نتيجتك: ${percentage}% - نظامك الغذائي ممتاز! تواصل على هذا المنوال.`;
            recommendationsList = [
                'استمر في تناول الأطعمة المفيدة',
                'شارك تجربتك مع الأسر الأخرى',
                'راقب التحسن في الأعراض'
            ];
        } else if (percentage >= 60) {
            resultCategory = 'جيد';
            resultMessage = `نتيجتك: ${percentage}% - نظامك الغذائي جيد مع إمكانية للتحسين.`;
            recommendationsList = [
                'زد من تناول السمك الدهني',
                'قلل من السكريات المكررة',
                'أضف المزيد من الخضار والفواكه',
                'تابع قسم الوجبات المصرية للأفكار'
            ];
        } else if (percentage >= 40) {
            resultCategory = 'متوسط';
            resultMessage = `نتيجتك: ${percentage}% - نظامك الغذائي يحتاج إلى تحسينات مهمة.`;
            recommendationsList = [
                'ابدأ بزيادة البروتينات في الوجبات',
                'تجنب الأطعمة المصنعة والحلويات',
                'أضف المكسرات والبذور',
                'اتبع خطة الوجبات الأسبوعية',
                'استشر أخصائي تغذية'
            ];
        } else {
            resultCategory = 'يحتاج تحسين';
            resultMessage = `نتيجتك: ${percentage}% - نظامك الغذائي يحتاج إلى تغييرات جذرية.`;
            recommendationsList = [
                'ابدأ بتطبيق الأسس الغذائية الأساسية',
                'استبدل الحلويات بالفواكه',
                'أضف وجبة إفطار صحية يومياً',
                'تناول السمك مرتين أسبوعياً على الأقل',
                'استشر طبيب أو أخصائي تغذية فوراً',
                'اتبع نصائح الحياة اليومية'
            ];
        }
        
        // Display results
        displayResults(resultMessage, recommendationsList, resultCategory);
    }
    
    function displayResults(message, recommendations, category) {
        // Set result message
        resultText.innerHTML = `
            <div class="status status--${getStatusClass(category)}">${message}</div>
        `;
        
        // Set recommendations
        const recommendationsHTML = recommendations.map(rec => 
            `<li>${rec}</li>`
        ).join('');
        
        recommendations.innerHTML = `
            <h5>التوصيات:</h5>
            <ul style="list-style: none; padding: 0;">
                ${recommendationsHTML}
            </ul>
        `;
        
        // Show result section
        resultDiv.style.display = 'block';
        
        // Smooth scroll to results
        resultDiv.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest'
        });
    }
    
    function getStatusClass(category) {
        switch(category) {
            case 'ممتاز': return 'success';
            case 'جيد': return 'info';
            case 'متوسط': return 'warning';
            default: return 'error';
        }
    }
}

// Symptom Tracker System
function initSymptomTracker() {
    const symptomForm = document.getElementById('symptomTracker');
    
    if (symptomForm) {
        // Set today's date as default
        const dateInput = symptomForm.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
        
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSymptomData();
        });
    }
    
    function saveSymptomData() {
        const formData = new FormData(symptomForm);
        const symptomData = {
            date: formData.get('date'),
            focus: formData.get('focus'),
            hyperactivity: formData.get('hyperactivity'),
            sleep: formData.get('sleep'),
            notes: formData.get('notes'),
            timestamp: new Date().toISOString()
        };
        
        // In a real application, this would be saved to a database
        // For now, we'll just show a success message
        showSuccessMessage('تم حفظ بيانات اليوم بنجاح! ✅');
        
        // You could extend this to save to localStorage for demo purposes:
        // saveToLocalStorage(symptomData);
    }
    
    function showSuccessMessage(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'status status--success';
        successDiv.textContent = message;
        successDiv.style.marginTop = '16px';
        
        // Remove any existing success message
        const existingMessage = symptomForm.querySelector('.status--success');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add success message
        symptomForm.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
        
        // Reset form
        symptomForm.reset();
        
        // Reset date to today
        const dateInput = symptomForm.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
        
        // Reset range sliders
        updateRangeValues();
    }
}

// Range Input Updates
function initRangeInputs() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(range => {
        const output = document.getElementById(range.name + 'Value');
        if (output) {
            // Set initial value
            output.textContent = range.value;
            
            // Update on input
            range.addEventListener('input', function() {
                output.textContent = this.value;
            });
        }
    });
}

function updateRangeValues() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(range => {
        const output = document.getElementById(range.name + 'Value');
        if (output) {
            output.textContent = range.value;
        }
    });
}

// Utility Functions
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .nav-item, .tab-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Enhance form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--color-primary)';
                this.style.boxShadow = '0 0 0 3px rgba(33, 128, 141, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'var(--color-border)';
                this.style.boxShadow = 'none';
            });
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle arrow key navigation for main sections
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const navItems = document.querySelectorAll('.nav-item');
        const activeItem = document.querySelector('.nav-item.active');
        
        if (activeItem) {
            const currentIndex = Array.from(navItems).indexOf(activeItem);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
            } else {
                nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
            }
            
            navItems[nextIndex].click();
            navItems[nextIndex].focus();
        }
    }
});

// Add scroll-based navigation highlighting (optional enhancement)
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section.active');
    const navItems = document.querySelectorAll('.nav-item');
    
    // This could be extended to highlight navigation based on scroll position
    // For now, we keep the manual navigation system
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle any resize-specific logic here
        updateRangeValues();
    }, 250);
});

// Add print functionality
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const printContent = section.outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>طباعة - ${section.querySelector('h2').textContent}</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    body { font-family: Arial, sans-serif; }
                    .content-section { display: block !important; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.setAttribute('role', 'tab');
        item.setAttribute('aria-selected', item.classList.contains('active'));
        item.setAttribute('tabindex', item.classList.contains('active') ? '0' : '-1');
    });
    
    // Add form labels and descriptions
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        if (!control.getAttribute('aria-label') && !control.previousElementSibling) {
            const label = control.closest('.form-group')?.querySelector('.form-label');
            if (label) {
                control.setAttribute('aria-labelledby', label.id || 'label-' + Math.random().toString(36).substr(2, 9));
            }
        }
    });
});

// Analytics and tracking (placeholder for future implementation)
function trackUserInteraction(action, section) {
    // This could be connected to analytics services
    console.log(`User action: ${action} in section: ${section}`);
}

// Export functions for potential external use
window.ADHDGuide = {
    showSection: function(sectionId) {
        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.click();
        }
    },
    printSection: printSection,
    trackInteraction: trackUserInteraction
};