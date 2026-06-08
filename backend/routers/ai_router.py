from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from middleware.auth import get_current_user
import anthropic
import os

router = APIRouter()
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class ListingRequest(BaseModel):
    message: str
    history: list = []

class SearchRequest(BaseModel):
    query: str

@router.post("/listing-assistant")
async def listing_assistant(req: ListingRequest, current_user=Depends(get_current_user)):
    try:
        messages = req.history + [{"role": "user", "content": req.message}]
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system="You are VisitSarva's property listing assistant. Help the seller describe their property. Extract structured data: title, category, description, location, area, price, bedrooms, bathrooms, amenities, features. Respond conversationally and return extracted JSON alongside your message.",
            messages=messages
        )
        return {"response": response.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/smart-search")
async def smart_search(req: SearchRequest, current_user=Depends(get_current_user)):
    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system="You are VisitSarva's property search assistant. Convert the user's natural language query into structured search filters: category, city, minPrice, maxPrice, minArea, maxArea, bedrooms, furnishing, features. Return JSON with filters and a friendly summary.",
            messages=[{"role": "user", "content": req.query}]
        )
        return {"response": response.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
