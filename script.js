// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navRight = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    navRight.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navRight.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 44; // Account for fixed navbar (44px height)
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for smooth scroll reveal - Apple Style
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections and elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observe individual elements with staggered animation
    const animateElements = document.querySelectorAll('.timeline-item, .exp-item, .project-card, .skill-category, .cert-item, .achievement-item, .publication-item, .highlight-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        elementObserver.observe(el);
    });
});

// Add active class to nav links on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment below if you want typing effect
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// });

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Hero role static text (typing effect disabled to prevent screen movement)
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    typingElement.textContent = 'Data Engineer · ML Engineer · Software Developer';
}

// Make hero section visible on load
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});

// ML Model Prediction Demo
function initMLModelDemo() {
    const predictBtn = document.getElementById('predictBtn');
    const mlResult = document.getElementById('mlResult');
    
    if (!predictBtn || !mlResult) return;

    predictBtn.addEventListener('click', () => {
        const emission = parseFloat(document.getElementById('emissionInput').value) || 0;
        const age = parseFloat(document.getElementById('ageInput').value) || 0;
        const mileage = parseFloat(document.getElementById('mileageInput').value) || 0;

        // Simulate ML model prediction
        // Based on real model logic: emission > 500 = non-compliant
        const isCompliant = emission <= 500;
        const confidence = Math.min(95, Math.max(85, 92 - (emission / 50) + (age * 0.5)));
        
        // Calculate risk factors
        const riskScore = ((emission / 1000) * 0.4 + (age / 30) * 0.3 + (mileage / 200000) * 0.3) * 100;

        mlResult.innerHTML = `
            <div class="prediction-result">
                <div class="prediction-header">
                    <div class="prediction-status ${isCompliant ? 'compliant' : 'non-compliant'}">
                        <i class="fas ${isCompliant ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${isCompliant ? 'Compliant' : 'Non-Compliant'}</span>
                    </div>
                    <div class="prediction-confidence">${confidence.toFixed(1)}% Confidence</div>
                </div>
                <div class="prediction-details">
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Emission Level</div>
                        <div class="prediction-detail-value">${emission} ppm</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Risk Score</div>
                        <div class="prediction-detail-value">${riskScore.toFixed(1)}%</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Vehicle Age</div>
                        <div class="prediction-detail-value">${age} years</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Mileage</div>
                        <div class="prediction-detail-value">${mileage.toLocaleString()} miles</div>
                    </div>
                </div>
            </div>
        `;
        mlResult.classList.add('show-result');
    });
}

// Live Data Processing Dashboard
function initDataProcessingDashboard() {
    const startBtn = document.getElementById('startPipeline');
    const resetBtn = document.getElementById('resetPipeline');
    const recordsCount = document.getElementById('recordsCount');
    const recordsProgress = document.getElementById('recordsProgress');
    const recordsRate = document.getElementById('recordsRate');
    const processingSpeed = document.getElementById('processingSpeed');
    const qualityScore = document.getElementById('qualityScore');
    const qualityBar = document.getElementById('qualityBar');

    if (!startBtn) return;

    let isRunning = false;
    let intervalId = null;
    let currentRecords = 0;
    let currentSpeed = 0;
    let currentQuality = 0;

    function updateMetrics() {
        if (!isRunning) return;

        // Simulate data processing
        const increment = Math.floor(Math.random() * 500) + 200;
        currentRecords += increment;
        currentSpeed = Math.floor(Math.random() * 100) + 800;
        currentQuality = Math.min(100, currentQuality + Math.random() * 0.5);

        // Update UI
        recordsCount.textContent = currentRecords.toLocaleString();
        recordsRate.textContent = increment;
        processingSpeed.textContent = currentSpeed.toLocaleString();
        qualityScore.textContent = currentQuality.toFixed(1);

        // Update progress bars
        const progressPercent = Math.min(100, (currentRecords / 10000000) * 100);
        recordsProgress.style.width = progressPercent + '%';
        qualityBar.style.width = currentQuality + '%';
    }

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Pipeline</span>';
            intervalId = setInterval(updateMetrics, 100);
        } else {
            isRunning = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Pipeline</span>';
            clearInterval(intervalId);
        }
    });

    resetBtn?.addEventListener('click', () => {
        isRunning = false;
        clearInterval(intervalId);
        currentRecords = 0;
        currentSpeed = 0;
        currentQuality = 0;
        recordsCount.textContent = '0';
        recordsRate.textContent = '0';
        processingSpeed.textContent = '0';
        qualityScore.textContent = '0.0';
        recordsProgress.style.width = '0%';
        qualityBar.style.width = '0%';
        startBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Pipeline</span>';
    });
}

// Code Playground
function initCodePlayground() {
    const codeEditor = document.getElementById('codeEditor');
    const codeOutput = document.getElementById('codeOutput');
    const runBtn = document.getElementById('runCode');
    const clearBtn = document.getElementById('clearCode');
    const codeTemplate = document.getElementById('codeTemplate');
    const codeTabs = document.querySelectorAll('.code-tab');

    if (!codeEditor || !codeOutput) return;

    // Code templates
    const templates = {
        etl: `import pandas as pd
from pyspark.sql import SparkSession

# Initialize Spark
spark = SparkSession.builder.appName("ETL_Pipeline").getOrCreate()

# Load data
df = spark.read.csv("data.csv", header=True)

# Transform
df_cleaned = df.filter(df.column.isNotNull())

# Write to output
df_cleaned.write.parquet("output/")`,
        ml: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd

# Load data
data = pd.read_csv('dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2%}")`,
        spark: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

spark = SparkSession.builder.appName("DataProcessing").getOrCreate()

# Read data
df = spark.read.parquet("data/")

# Process
result = df.groupBy("category").agg(
    count("*").alias("count"),
    avg("value").alias("avg_value")
)

result.show()`
    };

    // Tab switching
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const lang = tab.getAttribute('data-lang');
            codeEditor.placeholder = `Write your ${lang.toUpperCase()} code here...`;
        });
    });

    // Template loading
    codeTemplate?.addEventListener('change', (e) => {
        if (e.target.value && templates[e.target.value]) {
            codeEditor.value = templates[e.target.value];
        }
    });

    // Run code
    runBtn?.addEventListener('click', () => {
        const code = codeEditor.value.trim();
        if (!code) return;

        codeOutput.classList.remove('has-error');
        codeOutput.classList.add('has-output');
        
        // Simulate code execution
        codeOutput.innerHTML = '<div style="color: #00ff00;">Executing code...</div>';
        
        setTimeout(() => {
            // Simulate different outputs based on code content
            let output = '';
            if (code.includes('print') || code.includes('show')) {
                output = `>>> ${code.split('print')[1]?.replace(/['"]/g, '') || 'Execution completed'}\n✓ Code executed successfully\n\nOutput:\n${generateMockOutput(code)}`;
            } else if (code.includes('describe') || code.includes('info')) {
                output = generateDataFrameOutput();
            } else {
                output = '✓ Code executed successfully\n✓ No errors detected\n✓ Processing complete';
            }
            
            codeOutput.innerHTML = `<pre style="margin: 0; white-space: pre-wrap; font-family: inherit;">${output}</pre>`;
        }, 500);
    });

    // Clear output
    clearBtn?.addEventListener('click', () => {
        codeOutput.innerHTML = '<div class="output-placeholder"><i class="fas fa-terminal"></i><span>Output will appear here</span></div>';
        codeOutput.classList.remove('has-output', 'has-error');
    });

    function generateMockOutput(code) {
        if (code.includes('describe')) {
            return `       feature1    feature2
count  100.000000  100.000000
mean     0.023456   -0.012345
std      0.987654    1.012345
min     -2.345678   -2.456789
25%     -0.654321   -0.678901
50%      0.012345    0.023456
75%      0.678901    0.654321
max      2.345678    2.456789`;
        }
        return 'Result: Data processed successfully';
    }

    function generateDataFrameOutput() {
        return `DataFrame Summary:
- Rows: 10,000
- Columns: 5
- Memory Usage: 390.6 KB
- Data Types: int64, float64, object
- Null Values: 0`;
    }
}

// SQL Query Builder
function initSQLBuilder() {
    const sqlEditor = document.getElementById('sqlEditor');
    const sqlResults = document.getElementById('sqlResults');
    const runSqlBtn = document.getElementById('runSql');
    const explainSqlBtn = document.getElementById('explainSql');

    if (!sqlEditor || !sqlResults) return;

    // Mock data
    const mockData = [
        { vehicle_id: 'V001', emission_level: 450, vehicle_age: 8, compliance_status: 'Compliant' },
        { vehicle_id: 'V002', emission_level: 520, vehicle_age: 12, compliance_status: 'Non-Compliant' },
        { vehicle_id: 'V003', emission_level: 380, vehicle_age: 5, compliance_status: 'Compliant' },
        { vehicle_id: 'V004', emission_level: 680, vehicle_age: 15, compliance_status: 'Non-Compliant' },
        { vehicle_id: 'V005', emission_level: 420, vehicle_age: 7, compliance_status: 'Compliant' },
    ];

    runSqlBtn?.addEventListener('click', () => {
        const query = sqlEditor.value.trim().toLowerCase();
        
        if (!query) return;

        sqlResults.innerHTML = '<div style="color: #00ff00; padding: 16px;">Executing query...</div>';

        setTimeout(() => {
            if (query.includes('select')) {
                let filteredData = [...mockData];
                
                // Simple query parsing simulation
                if (query.includes('where') && query.includes('age >')) {
                    const ageMatch = query.match(/age > (\d+)/);
                    if (ageMatch) {
                        filteredData = filteredData.filter(d => d.vehicle_age > parseInt(ageMatch[1]));
                    }
                }
                
                if (query.includes('limit')) {
                    const limitMatch = query.match(/limit (\d+)/);
                    if (limitMatch) {
                        filteredData = filteredData.slice(0, parseInt(limitMatch[1]));
                    }
                }

                if (query.includes('order by') && query.includes('desc')) {
                    filteredData.sort((a, b) => b.emission_level - a.emission_level);
                }

                const headers = Object.keys(filteredData[0] || {});
                let tableHTML = '<table class="sql-table"><thead><tr>';
                headers.forEach(h => {
                    tableHTML += `<th>${h.replace('_', ' ').toUpperCase()}</th>`;
                });
                tableHTML += '</tr></thead><tbody>';
                
                filteredData.forEach(row => {
                    tableHTML += '<tr>';
                    headers.forEach(h => {
                        tableHTML += `<td>${row[h]}</td>`;
                    });
                    tableHTML += '</tr>';
                });
                
                tableHTML += '</tbody></table>';
                sqlResults.innerHTML = tableHTML + `<div style="margin-top: 12px; color: #86868b; font-size: 12px;">${filteredData.length} row(s) returned</div>`;
            } else {
                sqlResults.innerHTML = '<div style="color: #ff3b30;">Error: Invalid SQL syntax</div>';
            }
        }, 500);
    });

    explainSqlBtn?.addEventListener('click', () => {
        const query = sqlEditor.value.trim();
        if (!query) return;

        sqlResults.innerHTML = `
            <div class="query-explanation">
                <h4><i class="fas fa-info-circle"></i> Query Execution Plan</h4>
                <p><strong>Operation:</strong> Sequential Scan</p>
                <p><strong>Index Used:</strong> vehicle_age_idx</p>
                <p><strong>Estimated Rows:</strong> 10,000</p>
                <p><strong>Execution Time:</strong> 12.5ms</p>
                <p><strong>Optimization:</strong> Query uses index for WHERE clause filtering, reducing scan time by 85%</p>
            </div>
        `;
    });
}

// Playground ML Model Demo (separate instance)
function initMLModelDemoPlayground() {
    const predictBtn = document.getElementById('predictBtnPlay');
    const mlResult = document.getElementById('mlResultPlay');
    
    if (!predictBtn || !mlResult) return;

    predictBtn.addEventListener('click', () => {
        const emission = parseFloat(document.getElementById('emissionInputPlay').value) || 0;
        const age = parseFloat(document.getElementById('ageInputPlay').value) || 0;
        const mileage = parseFloat(document.getElementById('mileageInputPlay').value) || 0;

        const isCompliant = emission <= 500;
        const confidence = Math.min(95, Math.max(85, 92 - (emission / 50) + (age * 0.5)));
        const riskScore = ((emission / 1000) * 0.4 + (age / 30) * 0.3 + (mileage / 200000) * 0.3) * 100;

        mlResult.innerHTML = `
            <div class="prediction-result">
                <div class="prediction-header">
                    <div class="prediction-status ${isCompliant ? 'compliant' : 'non-compliant'}">
                        <i class="fas ${isCompliant ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${isCompliant ? 'Compliant' : 'Non-Compliant'}</span>
                    </div>
                    <div class="prediction-confidence">${confidence.toFixed(1)}% Confidence</div>
                </div>
                <div class="prediction-details">
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Emission Level</div>
                        <div class="prediction-detail-value">${emission} ppm</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Risk Score</div>
                        <div class="prediction-detail-value">${riskScore.toFixed(1)}%</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Vehicle Age</div>
                        <div class="prediction-detail-value">${age} years</div>
                    </div>
                    <div class="prediction-detail-item">
                        <div class="prediction-detail-label">Mileage</div>
                        <div class="prediction-detail-value">${mileage.toLocaleString()} miles</div>
                    </div>
                </div>
            </div>
        `;
        mlResult.classList.add('show-result');
    });
}

// Playground Data Processing Dashboard
function initDataProcessingDashboardPlayground() {
    const startBtn = document.getElementById('startPipelinePlay');
    const resetBtn = document.getElementById('resetPipelinePlay');
    const recordsCount = document.getElementById('recordsCountPlay');
    const recordsProgress = document.getElementById('recordsProgressPlay');
    const recordsRate = document.getElementById('recordsRatePlay');
    const processingSpeed = document.getElementById('processingSpeedPlay');
    const qualityScore = document.getElementById('qualityScorePlay');
    const qualityBar = document.getElementById('qualityBarPlay');

    if (!startBtn) return;

    let isRunning = false;
    let intervalId = null;
    let currentRecords = 0;
    let currentSpeed = 0;
    let currentQuality = 0;

    function updateMetrics() {
        if (!isRunning) return;

        const increment = Math.floor(Math.random() * 500) + 200;
        currentRecords += increment;
        currentSpeed = Math.floor(Math.random() * 100) + 800;
        currentQuality = Math.min(100, currentQuality + Math.random() * 0.5);

        recordsCount.textContent = currentRecords.toLocaleString();
        recordsRate.textContent = increment;
        processingSpeed.textContent = currentSpeed.toLocaleString();
        qualityScore.textContent = currentQuality.toFixed(1);

        const progressPercent = Math.min(100, (currentRecords / 10000000) * 100);
        recordsProgress.style.width = progressPercent + '%';
        qualityBar.style.width = currentQuality + '%';
    }

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Pipeline</span>';
            intervalId = setInterval(updateMetrics, 100);
        } else {
            isRunning = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Pipeline</span>';
            clearInterval(intervalId);
        }
    });

    resetBtn?.addEventListener('click', () => {
        isRunning = false;
        clearInterval(intervalId);
        currentRecords = 0;
        currentSpeed = 0;
        currentQuality = 0;
        recordsCount.textContent = '0';
        recordsRate.textContent = '0';
        processingSpeed.textContent = '0';
        qualityScore.textContent = '0.0';
        recordsProgress.style.width = '0%';
        qualityBar.style.width = '0%';
        startBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Pipeline</span>';
    });
}

// Playground Code Playground
function initCodePlaygroundPlayground() {
    const codeEditor = document.getElementById('codeEditorPlay');
    const codeOutput = document.getElementById('codeOutputPlay');
    const runBtn = document.getElementById('runCodePlay');
    const clearBtn = document.getElementById('clearCodePlay');
    const codeTemplate = document.getElementById('codeTemplatePlay');
    const codeTabs = document.querySelectorAll('.code-tab[data-playground="true"]');

    if (!codeEditor || !codeOutput) return;

    const templates = {
        etl: `import pandas as pd
from pyspark.sql import SparkSession

# Initialize Spark
spark = SparkSession.builder.appName("ETL_Pipeline").getOrCreate()

# Load data
df = spark.read.csv("data.csv", header=True)

# Transform
df_cleaned = df.filter(df.column.isNotNull())

# Write to output
df_cleaned.write.parquet("output/")`,
        ml: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd

# Load data
data = pd.read_csv('dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2%}")`,
        spark: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

spark = SparkSession.builder.appName("DataProcessing").getOrCreate()

# Read data
df = spark.read.parquet("data/")

# Process
result = df.groupBy("category").agg(
    count("*").alias("count"),
    avg("value").alias("avg_value")
)

result.show()`
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const lang = tab.getAttribute('data-lang');
            codeEditor.placeholder = `Write your ${lang.toUpperCase()} code here...`;
        });
    });

    codeTemplate?.addEventListener('change', (e) => {
        if (e.target.value && templates[e.target.value]) {
            codeEditor.value = templates[e.target.value];
        }
    });

    runBtn?.addEventListener('click', () => {
        const code = codeEditor.value.trim();
        if (!code) return;

        codeOutput.classList.remove('has-error');
        codeOutput.classList.add('has-output');
        
        codeOutput.innerHTML = '<div style="color: #00ff00;">Executing code...</div>';
        
        setTimeout(() => {
            let output = '';
            if (code.includes('print') || code.includes('show')) {
                output = `>>> ${code.split('print')[1]?.replace(/['"]/g, '') || 'Execution completed'}\n✓ Code executed successfully\n\nOutput:\n${generateMockOutput(code)}`;
            } else if (code.includes('describe') || code.includes('info')) {
                output = generateDataFrameOutput();
            } else {
                output = '✓ Code executed successfully\n✓ No errors detected\n✓ Processing complete';
            }
            
            codeOutput.innerHTML = `<pre style="margin: 0; white-space: pre-wrap; font-family: inherit;">${output}</pre>`;
        }, 500);
    });

    clearBtn?.addEventListener('click', () => {
        codeOutput.innerHTML = '<div class="output-placeholder"><i class="fas fa-terminal"></i><span>Output will appear here</span></div>';
        codeOutput.classList.remove('has-output', 'has-error');
    });

    function generateMockOutput(code) {
        if (code.includes('describe')) {
            return `       feature1    feature2
count  100.000000  100.000000
mean     0.023456   -0.012345
std      0.987654    1.012345
min     -2.345678   -2.456789
25%     -0.654321   -0.678901
50%      0.012345    0.023456
75%      0.678901    0.654321
max      2.345678    2.456789`;
        }
        return 'Result: Data processed successfully';
    }

    function generateDataFrameOutput() {
        return `DataFrame Summary:
- Rows: 10,000
- Columns: 5
- Memory Usage: 390.6 KB
- Data Types: int64, float64, object
- Null Values: 0`;
    }
}

// Playground SQL Builder
function initSQLBuilderPlayground() {
    const sqlEditor = document.getElementById('sqlEditorPlay');
    const sqlResults = document.getElementById('sqlResultsPlay');
    const runSqlBtn = document.getElementById('runSqlPlay');
    const explainSqlBtn = document.getElementById('explainSqlPlay');

    if (!sqlEditor || !sqlResults) return;

    const mockData = [
        { vehicle_id: 'V001', emission_level: 450, vehicle_age: 8, compliance_status: 'Compliant' },
        { vehicle_id: 'V002', emission_level: 520, vehicle_age: 12, compliance_status: 'Non-Compliant' },
        { vehicle_id: 'V003', emission_level: 380, vehicle_age: 5, compliance_status: 'Compliant' },
        { vehicle_id: 'V004', emission_level: 680, vehicle_age: 15, compliance_status: 'Non-Compliant' },
        { vehicle_id: 'V005', emission_level: 420, vehicle_age: 7, compliance_status: 'Compliant' },
    ];

    runSqlBtn?.addEventListener('click', () => {
        const query = sqlEditor.value.trim().toLowerCase();
        
        if (!query) return;

        sqlResults.innerHTML = '<div style="color: #00ff00; padding: 16px;">Executing query...</div>';

        setTimeout(() => {
            if (query.includes('select')) {
                let filteredData = [...mockData];
                
                if (query.includes('where') && query.includes('age >')) {
                    const ageMatch = query.match(/age > (\d+)/);
                    if (ageMatch) {
                        filteredData = filteredData.filter(d => d.vehicle_age > parseInt(ageMatch[1]));
                    }
                }
                
                if (query.includes('limit')) {
                    const limitMatch = query.match(/limit (\d+)/);
                    if (limitMatch) {
                        filteredData = filteredData.slice(0, parseInt(limitMatch[1]));
                    }
                }

                if (query.includes('order by') && query.includes('desc')) {
                    filteredData.sort((a, b) => b.emission_level - a.emission_level);
                }

                const headers = Object.keys(filteredData[0] || {});
                let tableHTML = '<table class="sql-table"><thead><tr>';
                headers.forEach(h => {
                    tableHTML += `<th>${h.replace('_', ' ').toUpperCase()}</th>`;
                });
                tableHTML += '</tr></thead><tbody>';
                
                filteredData.forEach(row => {
                    tableHTML += '<tr>';
                    headers.forEach(h => {
                        tableHTML += `<td>${row[h]}</td>`;
                    });
                    tableHTML += '</tr>';
                });
                
                tableHTML += '</tbody></table>';
                sqlResults.innerHTML = tableHTML + `<div style="margin-top: 12px; color: #86868b; font-size: 12px;">${filteredData.length} row(s) returned</div>`;
            } else {
                sqlResults.innerHTML = '<div style="color: #ff3b30;">Error: Invalid SQL syntax</div>';
            }
        }, 500);
    });

    explainSqlBtn?.addEventListener('click', () => {
        const query = sqlEditor.value.trim();
        if (!query) return;

        sqlResults.innerHTML = `
            <div class="query-explanation">
                <h4><i class="fas fa-info-circle"></i> Query Execution Plan</h4>
                <p><strong>Operation:</strong> Sequential Scan</p>
                <p><strong>Index Used:</strong> vehicle_age_idx</p>
                <p><strong>Estimated Rows:</strong> 10,000</p>
                <p><strong>Execution Time:</strong> 12.5ms</p>
                <p><strong>Optimization:</strong> Query uses index for WHERE clause filtering, reducing scan time by 85%</p>
            </div>
        `;
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    initMLModelDemo();
    initDataProcessingDashboard();
    initCodePlayground();
    initSQLBuilder();
    
    // Initialize playground features
    initMLModelDemoPlayground();
    initDataProcessingDashboardPlayground();
    initCodePlaygroundPlayground();
    initSQLBuilderPlayground();
});

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #0071e3; font-size: 16px; font-weight: 600;');
console.log('%cFeel free to reach out at vedagayathriravi@gmail.com', 'color: #86868b; font-size: 12px;');


