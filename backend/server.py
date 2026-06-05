from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Sarvabhoomi Realty API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactLeadCreate(BaseModel):
    name: str
    email: str
    phone: str
    interest: Optional[str] = "general"
    location: Optional[str] = None
    message: Optional[str] = None


class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    interest: str = "general"
    location: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PropertySearchInput(BaseModel):
    property_type: Optional[str] = None  # residential | commercial | plots
    city: Optional[str] = None
    budget: Optional[str] = None
    bhk: Optional[str] = None


# ---------- Static demo content ----------
PROPERTIES = [
    {
        "id": "p-001",
        "title": "Aranya Heights — Garden Villa",
        "location": "Whitefield, Bangalore",
        "price": "₹ 4.85 Cr",
        "bhk": "4 BHK",
        "area": "3,850 sq.ft",
        "category": "residential",
        "tag": "Ready to Move",
        "image": "https://images.pexels.com/photos/36676879/pexels-photo-36676879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "p-002",
        "title": "Meridian Tower — Grade A Office",
        "location": "HITEC City, Hyderabad",
        "price": "₹ 12,500 / sq.ft",
        "bhk": "Open Floor",
        "area": "12,000 sq.ft",
        "category": "commercial",
        "tag": "Pre-leased",
        "image": "https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "p-003",
        "title": "Vanasthali Estates — Premium Plots",
        "location": "Devanahalli, Bangalore",
        "price": "₹ 78 Lakh onwards",
        "bhk": "Plot",
        "area": "2,400 — 4,800 sq.ft",
        "category": "plots",
        "tag": "RERA Approved",
        "image": "https://images.pexels.com/photos/11518541/pexels-photo-11518541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "p-004",
        "title": "Sarvabhoomi Skyline Residences",
        "location": "Jubilee Hills, Hyderabad",
        "price": "₹ 6.20 Cr",
        "bhk": "5 BHK Penthouse",
        "area": "5,400 sq.ft",
        "category": "residential",
        "tag": "Limited Edition",
        "image": "https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB2aWxsYSUyMG1vZGVybiUyMGV2ZW5pbmd8ZW58MHx8fHwxNzgwNjUwNjA4fDA&ixlib=rb-4.1.0&q=85",
    },
    {
        "id": "p-005",
        "title": "Mauryan Square — Retail Highstreet",
        "location": "Indiranagar, Bangalore",
        "price": "₹ 18,800 / sq.ft",
        "bhk": "Retail",
        "area": "1,200 — 6,400 sq.ft",
        "category": "commercial",
        "tag": "High Footfall",
        "image": "https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "p-006",
        "title": "Nilagiri Farm Retreats",
        "location": "Coorg, Karnataka",
        "price": "₹ 1.45 Cr",
        "bhk": "Farm Land",
        "area": "1 Acre",
        "category": "plots",
        "tag": "Hilltop",
        "image": "https://images.pexels.com/photos/11518541/pexels-photo-11518541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
]

TESTIMONIALS = [
    {
        "id": "t-001",
        "name": "Arjun Mehra",
        "role": "Managing Partner, Mehra & Co.",
        "location": "Bangalore",
        "quote": "Sarvabhoomi turned what is usually a tense process into an unhurried, elegant decision. The diligence on title and approvals was extraordinary.",
        "image": "https://images.pexels.com/photos/7580994/pexels-photo-7580994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "t-002",
        "name": "Kavya Iyer",
        "role": "Senior VP, Finance",
        "location": "Hyderabad",
        "quote": "We acquired our family home and a Grade A office through the same advisor. The relationship feels more like a private bank than a realty firm.",
        "image": "https://images.pexels.com/photos/7580837/pexels-photo-7580837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
        "id": "t-003",
        "name": "Rohit Bhandari",
        "role": "Founder, BhandariVentures",
        "location": "Pune",
        "quote": "Their land bank insights helped us close a 12 acre transaction in eight weeks. Few teams in India combine taste, speed and rigour the way they do.",
        "image": "https://images.pexels.com/photos/7580994/pexels-photo-7580994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sarvabhoomi Realty API"}


@api_router.get("/properties")
async def list_properties(category: Optional[str] = None):
    if category and category != "all":
        return [p for p in PROPERTIES if p["category"] == category]
    return PROPERTIES


@api_router.post("/properties/search")
async def search_properties(query: PropertySearchInput):
    results = PROPERTIES
    if query.property_type and query.property_type != "all":
        results = [p for p in results if p["category"] == query.property_type]
    if query.city:
        results = [p for p in results if query.city.lower() in p["location"].lower()]
    if query.bhk and query.bhk != "any":
        results = [p for p in results if query.bhk.lower() in p["bhk"].lower()]
    return {"count": len(results), "results": results}


@api_router.get("/testimonials")
async def list_testimonials():
    return TESTIMONIALS


@api_router.post("/contact", response_model=ContactLead)
async def create_contact(payload: ContactLeadCreate):
    if not payload.name.strip() or not payload.email.strip() or not payload.phone.strip():
        raise HTTPException(status_code=422, detail="Name, email and phone are required.")
    lead = ContactLead(**payload.model_dump())
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_leads.insert_one(doc)
    return lead


@api_router.get("/contact", response_model=List[ContactLead])
async def list_contacts():
    leads = await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for lead in leads:
        if isinstance(lead.get("created_at"), str):
            lead["created_at"] = datetime.fromisoformat(lead["created_at"])
    return leads


@api_router.get("/stats")
async def stats():
    return {
        "years": 18,
        "properties_handled": 1240,
        "happy_families": 980,
        "cities": 12,
        "rera_approved": True,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
