from pydantic import BaseModel, Field


class AuthIn(BaseModel):
    email: str
    password: str = Field(min_length=4, max_length=100)


class AuthOut(BaseModel):
    token: str


class MeOut(BaseModel):
    id: int
    email: str
    is_admin: bool


class ChangePasswordIn(BaseModel):
    current_password: str = Field(min_length=4, max_length=100)
    new_password: str = Field(min_length=4, max_length=100)


class ForgotPasswordRequestIn(BaseModel):
    email: str


class ForgotPasswordConfirmIn(BaseModel):
    email: str
    code: str = Field(min_length=4, max_length=20)
    new_password: str = Field(min_length=4, max_length=100)


class BikeIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    bike_type: str = Field(min_length=1, max_length=40)
    total_mileage_km: float = 0


class BikeOut(BikeIn):
    id: int


class BikeMileageDeltaIn(BaseModel):
    km: float = Field(gt=0)


class PartIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    category: str | None = Field(default=None, max_length=40)
    current_mileage_km: float = 0
    resource_km: float = 1000


class PartOut(PartIn):
    id: int
    bike_id: int
    status: str


class GuideIn(BaseModel):
    title: str
    topic: str
    content: str


class GuideOut(GuideIn):
    id: int


class AskIn(BaseModel):
    question: str = Field(min_length=1, max_length=500)


class AskOut(BaseModel):
    answer: str
