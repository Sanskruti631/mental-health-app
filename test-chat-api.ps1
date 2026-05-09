$url = "http://localhost:3000/api/chat"
$body = @{
    message = "I have been feeling a bit overwhelmed with exams lately."
    history = @()
    contextFeatures = @{
        phq9 = 8
        gad7 = 12
        ghq12 = 4
        quizRiskScore = 0.5
        avgMood7Days = 2.5
        moodTrend = "stable"
    }
} | ConvertTo-Json -Depth 5

try {
    Write-Host "Sending test request to /api/chat..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
    Write-Host "Response received successfully!" -ForegroundColor Green
    Write-Host "--------------------------------"
    Write-Host "Assistant Reply: $($response.reply)" -ForegroundColor Yellow
    Write-Host "Predicted Risk: $($response.risk)" -ForegroundColor Gray
    Write-Host "Confidence: $($response.confidence)" -ForegroundColor Gray
    Write-Host "Chat Negativity: $($response.chat_neg)" -ForegroundColor Gray
    Write-Host "--------------------------------"
} catch {
    Write-Host "Error occurred while testing the API:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails) {
        Write-Host $_.ErrorDetails.Message
    }
}
