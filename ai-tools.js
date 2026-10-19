document.getElementById('scriptForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const brandName = document.getElementById('brandName').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const outputBox = document.getElementById('outputBox');
    const submitBtn = document.getElementById('generateBtn');

    outputBox.innerText = "Generating professional commercial script via AI engine... Please wait...";
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:5678/webhook/generate-script', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: {
                    brandName: brandName,
                    targetAudience: targetAudience
                }
            })
        });

        const data = await response.json();
        
        if (data && data.script) {
            outputBox.innerText = data.script;
        } else {
            outputBox.innerText = "Error: Invalid response structure received from backend.";
        }
    } catch (error) {
        console.error('Connection Error:', error);
        outputBox.innerText = "❌ Connection Error: Could not reach n8n backend engine. Make sure n8n is running locally on port 5678 and workflow is ACTIVE.";
    } finally {
        submitBtn.disabled = false;
    }
});
