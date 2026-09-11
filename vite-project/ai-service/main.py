import json
import os
import time
import requests
from typing import Any, List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

app = FastAPI(title="Geopolitics AI Simulation Service", version="1.2.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["*"], allow_headers=["*"])


class Scenario(BaseModel):
    scenarioName: str
    eventType: str = "historical"
    historicalEvent: Optional[str] = None
    country: str
    customPrompt: str = ""
    militaryChange: int = 0
    gdpChange: float = 0
    sanctions: bool = False
    tradeRestriction: str = "None"
    politicalStability: str = "Stable"
    diplomacyAction: str = "Maintain current relations"
    resourceShock: str = "None"
    technologyChange: str = "No change"
    participatingCountries: List[str] = Field(default_factory=list)


def score(data: Scenario):
    military = max(0, min(100, 40 + data.militaryChange * 1.2 + (12 if "weapons" in data.technologyChange.lower() else 0)))
    economic = max(0, min(100, 35 + abs(data.gdpChange) * 5 + (18 if data.sanctions else 0) + {"None": 0, "Mild": 8, "Moderate": 16, "Severe": 28, "Complete": 38}.get(data.tradeRestriction, 0)))
    political = max(0, min(100, {"Stable": 18, "Watchlist": 38, "Declining": 58, "Unstable": 78, "Collapse": 94}.get(data.politicalStability, 35)))
    trade = max(0, min(100, {"None": 10, "Mild": 28, "Moderate": 48, "Severe": 72, "Complete": 92}.get(data.tradeRestriction, 10) + (10 if data.resourceShock != "None" else 0)))
    cyber = 50 if "cyber" in data.technologyChange.lower() else 22
    environment = 55 if data.resourceShock in ["Oil supply", "Water", "Food supply"] else 18
    overall = round((military + economic + political + trade + cyber + environment) / 6)
    return {"political": political, "military": military, "economic": economic, "trade": trade, "cyber": cyber, "environmental": environment, "overall": overall}


def local_simulation(data: Scenario) -> dict[str, Any]:
    risks = score(data)
    event_name = data.historicalEvent if data.eventType == "historical" else data.scenarioName
    actors = data.participatingCountries or [data.country]
    modification = data.customPrompt or "No additional free-text modification was supplied."
    first_event = modification if data.customPrompt else "Baseline scenario conditions are applied to " + data.country
    timeline = [
        {"phase": "Day 1", "description": first_event, "reason": "User modification changes the initial decision point.", "countries": actors, "economicImpact": "Immediate market uncertainty", "militaryImpact": "Readiness review", "politicalImpact": "Emergency consultations", "probability": 92},
        {"phase": "Week 1", "description": "Participating states update diplomatic and military postures.", "reason": "Alliances and historical relationships react to the new world state.", "countries": actors, "economicImpact": "Trade risk repriced", "militaryImpact": "Force posture adjusted", "politicalImpact": "Alliance coordination", "probability": 84},
        {"phase": "Month 1", "description": "Trade routes, sanctions exposure, and resource availability are reassessed.", "reason": "Economic and resource variables propagate through connected markets.", "countries": actors, "economicImpact": "Supply-chain disruption", "militaryImpact": "Logistics pressure", "politicalImpact": "Domestic policy response", "probability": 76},
        {"phase": "Month 6", "description": "The modified strategy produces an identifiable regional equilibrium.", "reason": "Repeated feedback between diplomacy, markets, and military capacity stabilises outcomes.", "countries": actors, "economicImpact": "Investment adjustment", "militaryImpact": "Capability reallocation", "politicalImpact": "Negotiation window", "probability": 68},
        {"phase": "Year 2", "description": "Long-term consequences diverge into competing futures.", "reason": "Uncertainty in external actors and domestic resilience creates multiple plausible paths.", "countries": actors, "economicImpact": "Structural growth impact", "militaryImpact": "Deterrence balance", "politicalImpact": "Regional order shift", "probability": 60},
    ]
    futures = [
        {"label": "Future A — Most likely", "probability": 58, "summary": "Managed escalation followed by a negotiated regional adjustment.", "political": "Diplomatic pressure increases before a mediated settlement.", "military": "Readiness rises without sustained large-scale conflict.", "economic": "Temporary shock with targeted sector losses.", "trade": "Routes diversify and costs remain elevated.", "recommendation": "Preserve diplomatic channels while protecting strategic supply routes.", "reasoning": "The weighted model favours stabilisation when trade and alliance costs outweigh escalation benefits."},
        {"label": "Future B — Alternative", "probability": 30, "summary": "A rapid diplomatic agreement limits second-order market damage.", "political": "Confidence-building measures improve relations.", "military": "De-escalation and verification measures.", "economic": "Recovery begins within two quarters.", "trade": "Embargo exposure reduces through exemptions.", "recommendation": "Offer phased commitments tied to measurable de-escalation.", "reasoning": "This path requires early cooperation by all principal actors."},
        {"label": "Future C — Low probability", "probability": 12, "summary": "Miscommunication and resource stress create a prolonged confrontation.", "political": "Alliance fragmentation and domestic pressure.", "military": "Extended mobilisation and higher accident risk.", "economic": "Persistent inflation and investment retreat.", "trade": "Severe disruption to critical imports.", "recommendation": "Maintain reserves, contingency logistics, and crisis communications.", "reasoning": "This outcome is less likely but becomes material if diplomacy fails during the first month."},
    ]
    return {"scenarioSummary": {"name": data.scenarioName, "baseEvent": event_name, "modifiedDecision": modification, "countries": actors}, "confidence": max(52, 92 - risks["overall"] // 2), "worldState": {"gdpChange": data.gdpChange, "militaryChange": data.militaryChange, "diplomacy": data.diplomacyAction, "resources": data.resourceShock}, "risks": risks, "timeline": timeline, "futures": futures, "recommendation": {"bestAction": "Build diplomatic off-ramps and protect critical trade.", "alternativeAction": "Create a limited confidence-building agreement.", "worstDecision": "Escalate while supply resilience is low.", "expectedBenefits": "Lower risk of long-term regional disruption.", "expectedLosses": "Near-term policy and logistics costs."}, "reasoning": "Result generated by deterministic weighted scoring.", "generation": {"mode": "local", "message": "Local baseline used. Add OPENAI_API_KEY for LLM-generated scenario analysis."}}


def is_safe_narrative(payload: Any) -> bool:
    if not isinstance(payload, dict) or not isinstance(payload.get("timeline"), list) or not isinstance(payload.get("futures"), list):
        return False
    timeline_keys = {"phase", "description", "reason", "countries", "economicImpact", "militaryImpact", "politicalImpact", "probability"}
    future_keys = {"label", "probability", "summary", "political", "military", "economic", "trade", "recommendation", "reasoning"}
    recommendation_keys = {"bestAction", "alternativeAction", "worstDecision", "expectedBenefits", "expectedLosses"}
    return len(payload["timeline"]) >= 3 and len(payload["futures"]) == 3 and all(timeline_keys <= item.keys() for item in payload["timeline"] if isinstance(item, dict)) and all(future_keys <= item.keys() for item in payload["futures"] if isinstance(item, dict)) and recommendation_keys <= payload.get("recommendation", {}).keys() and isinstance(payload.get("reasoning"), str)


def enhance_with_llm(data: Scenario, baseline: dict[str, Any]) -> dict[str, Any]:
    provider = os.getenv("LLM_PROVIDER", "deepseek").lower()
    api_key = os.getenv("GEMINI_API_KEY") if provider == "gemini" else ((os.getenv("DEEPSEEK_API_KEY") or os.getenv("OPENAI_API_KEY")) if provider == "deepseek" else os.getenv("OPENAI_API_KEY"))
    if not api_key:
        return baseline
    try:
        from openai import OpenAI
        prompt = f'''You are a geopolitical scenario analyst. Analyse the scenario below as a classroom simulation, not as a prediction or advice. Be specific to the event, countries, and changed decision. Return ONLY valid JSON with exactly these fields: timeline (at least 3 objects with phase, description, reason, countries, economicImpact, militaryImpact, politicalImpact, probability), futures (exactly 3 objects with label, probability, summary, political, military, economic, trade, recommendation, reasoning), recommendation (bestAction, alternativeAction, worstDecision, expectedBenefits, expectedLosses), and reasoning. Probabilities must be integers from 0 to 100.\n\nScenario:\n{json.dumps(data.model_dump(), ensure_ascii=False)}'''
        if provider == "gemini":
            from google import genai
            from google.genai import types
            model = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(model=model, contents=prompt, config=types.GenerateContentConfig(response_mime_type="application/json"))
            narrative = json.loads(response.text or "{}")
        elif provider == "deepseek":
            model = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
            response = OpenAI(api_key=api_key, base_url="https://api.deepseek.com").chat.completions.create(model=model, messages=[{"role": "user", "content": prompt}], response_format={"type": "json_object"})
            narrative = json.loads(response.choices[0].message.content or "{}")
        else:
            model = os.getenv("OPENAI_MODEL", "gpt-5.4-mini")
            response = OpenAI(api_key=api_key).responses.create(model=model, input=prompt)
            narrative = json.loads(response.output_text)
        if not is_safe_narrative(narrative):
            raise ValueError("The LLM response did not match the simulation schema.")
        baseline.update(narrative)
        baseline["generation"] = {"mode": "llm", "model": model, "message": "LLM-generated scenario analysis"}
    except Exception as error:
        baseline["generation"] = {"mode": "local-fallback", "message": "LLM was unavailable, so the local baseline was used.", "detail": str(error)[:160]}
    return baseline


@app.get("/health")
def health():
    return {"status": "ok", "engines": ["world_state", "timeline", "risk", "recommendation", "knowledge_graph"], "llmConfigured": bool(os.getenv("GEMINI_API_KEY")) if os.getenv("LLM_PROVIDER", "deepseek").lower() == "gemini" else bool(os.getenv("DEEPSEEK_API_KEY") or os.getenv("OPENAI_API_KEY")), "llmProvider": os.getenv("LLM_PROVIDER", "deepseek")}


@app.post("/simulate")
def simulate(data: Scenario):
    return enhance_with_llm(data, local_simulation(data))
class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: List[dict[str, str]] = Field(default_factory=list)


def gemini_json(prompt: str) -> Any:
    if os.getenv("LLM_PROVIDER", "gemini").lower() != "gemini" or not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=503, detail="Gemini is not configured. Add GEMINI_API_KEY to ai-service/.env.")
    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        response = client.models.generate_content(
            model=os.getenv("GEMINI_MODEL", "gemini-flash-latest"),
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
        return json.loads(response.text or "{}")
    except Exception as error:
        raise HTTPException(status_code=503, detail=f"Gemini is temporarily unavailable: {str(error)[:180]}") from error


@app.post("/chat")
def chat(request: ChatRequest):
    prior_messages = "\n".join(f"{item.get('role', 'user')}: {item.get('content', '')}" for item in request.history[-6:])
    prompt = f'''You are GeoPolitics AI, a classroom research assistant. Answer the user's geopolitical question carefully. Separate known facts from reasoned analysis, avoid claiming real-time data unless it appears in the conversation, and never provide operational military advice. Give a concise answer in plain text.\n\nConversation:\n{prior_messages}\n\nUser: {request.message}'''
    if os.getenv("LLM_PROVIDER", "gemini").lower() != "gemini" or not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=503, detail="Gemini is not configured.")
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        for attempt in range(3):
            try:
                response = client.models.generate_content(model=os.getenv("GEMINI_MODEL", "gemini-flash-latest"), contents=prompt)
                return {"response": response.text or "Gemini returned an empty response.", "model": os.getenv("GEMINI_MODEL", "gemini-flash-latest")}
            except Exception as error:
                if "503" not in str(error) or attempt == 2:
                    raise
                time.sleep(2 ** attempt)
    except Exception as error:
        raise HTTPException(status_code=503, detail=f"Gemini is temporarily unavailable: {str(error)[:180]}") from error


@app.post("/recommendations/generate")
def recommendations():
    prompt = '''Act as a geopolitical risk analyst for a classroom dashboard. Return ONLY JSON with a `recommendations` array of exactly 6 objects. Each object must have: id (string), title (string), description (string), priority (one of high, medium, low), risk (same value as priority), confidence (integer 50-90), country (string), time (string), sources (array of 2 or 3 strings). Use varied countries and themes. Do not claim access to live news; write evidence-aware, general recommendations.'''
    payload = gemini_json(prompt)
    items = payload.get("recommendations") if isinstance(payload, dict) else None
    if not isinstance(items, list) or len(items) != 6:
        raise HTTPException(status_code=503, detail="Gemini returned an invalid recommendations format. Please try again.")
    return {"recommendations": items, "model": os.getenv("GEMINI_MODEL", "gemini-flash-latest")}
@app.get("/news")
def news(query: str = "geopolitics"):
    api_key = os.getenv("NEWS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="NewsAPI is not configured.")
    try:
        response = requests.get("https://newsapi.org/v2/everything", params={"q": query, "language": "en", "sortBy": "publishedAt", "pageSize": 10, "apiKey": api_key}, timeout=15)
        response.raise_for_status()
        articles = response.json().get("articles", [])
        return {"articles": [{"id": f"news-{index}", "title": item.get("title") or "Untitled report", "country": item.get("source", {}).get("name") or "News source", "time": (item.get("publishedAt") or "").replace("T", " ").replace("Z", " UTC"), "sentiment": "neutral", "description": item.get("description") or "", "url": item.get("url") or ""} for index, item in enumerate(articles)]}
    except requests.RequestException as error:
        raise HTTPException(status_code=503, detail="NewsAPI request failed. Please try again later.") from error


@app.get("/market")
def market(symbol: str = "IBM"):
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="Alpha Vantage is not configured.")
    try:
        response = requests.get("https://www.alphavantage.co/query", params={"function": "TIME_SERIES_DAILY", "symbol": symbol, "outputsize": "compact", "apikey": api_key}, timeout=20)
        response.raise_for_status()
        payload = response.json()
        series = payload.get("Time Series (Daily)")
        if not series:
            raise HTTPException(status_code=503, detail=payload.get("Note") or payload.get("Information") or "Alpha Vantage returned no market data.")
        points = [{"day": day, "value": round(float(values["4. close"]), 2)} for day, values in sorted(series.items())[-30:]]
        latest, previous = points[-1], points[-2]
        change = round(((latest["value"] - previous["value"]) / previous["value"]) * 100, 2)
        return {"symbol": symbol.upper(), "latest": latest["value"], "change": change, "series": points, "updated": latest["day"]}
    except requests.RequestException as error:
        raise HTTPException(status_code=503, detail="Alpha Vantage request failed. Please try again later.") from error
MARKET_CACHE: dict[str, dict[str, Any]] = {}


def fetch_market(symbol: str) -> dict[str, Any]:
    cached = MARKET_CACHE.get(symbol)
    if cached and time.time() - cached["saved"] < 300:
        return cached["data"]
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    response = requests.get("https://www.alphavantage.co/query", params={"function": "TIME_SERIES_DAILY", "symbol": symbol, "outputsize": "compact", "apikey": api_key}, timeout=20)
    response.raise_for_status(); payload = response.json(); series = payload.get("Time Series (Daily)")
    if not series: raise HTTPException(status_code=429, detail=payload.get("Note") or payload.get("Information") or "Alpha Vantage returned no market data.")
    points = [{"day": day, "value": round(float(values["4. close"]), 2)} for day, values in sorted(series.items())[-30:]]
    data = {"symbol": symbol.upper(), "latest": points[-1]["value"], "change": round(((points[-1]["value"] - points[-2]["value"]) / points[-2]["value"]) * 100, 2), "series": points, "updated": points[-1]["day"]}
    MARKET_CACHE[symbol] = {"saved": time.time(), "data": data}; return data


@app.get("/market/overview")
def market_overview():
    symbols = ["AAPL", "MSFT", "META", "TSLA", "NVDA", "AMZN"]
    data = []
    for index, symbol in enumerate(symbols):
        try: data.append(fetch_market(symbol))
        except HTTPException:
            if not data: raise
        if index < len(symbols) - 1: time.sleep(1.1)
    return {"markets": data, "cached": True}


@app.get("/public-finance")
def public_finance(country: str = "IND"):
    try:
        response = requests.get(f"https://api.worldbank.org/v2/country/{country}/indicator/GC.XPN.TOTL.GD.ZS", params={"format": "json", "per_page": 20}, timeout=20)
        response.raise_for_status(); payload = response.json(); rows = payload[1] if len(payload) > 1 else []
        series = [{"year": row["date"], "value": round(row["value"], 2)} for row in rows if row.get("value") is not None][:10]
        if not series: raise HTTPException(status_code=503, detail="No public-finance data is available for this country.")
        return {"country": country, "indicator": "Central government expense (% of GDP)", "latest": series[0], "series": list(reversed(series)), "source": "World Bank"}
    except requests.RequestException as error: raise HTTPException(status_code=503, detail="World Bank data is unavailable.") from error