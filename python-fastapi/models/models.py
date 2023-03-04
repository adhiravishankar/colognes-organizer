from sqlalchemy import Column, String, ForeignKey, Boolean, UnicodeText
from sqlalchemy.orm import relationship

from models.database import Base


class Manufacturer(Base):
    __tablename__ = "manufacturers"

    id = Column(String, primary_key=False, unique=True, index=True)
    name = Column(String)

    colognes = relationship("Cologne", back_populates="manufacturer")


class Cologne(Base):
    __tablename__ = "colognes"

    id = Column(String, primary_key=False, unique=True, index=True)
    name = Column(String)
    purchased = Column(Boolean, default=False)

    attributes = relationship("Attribute", back_populates="cologne")

    # Manufacturer
    manufacturer_id = Column(String, ForeignKey("manufacturers.id"))
    manufacturer = relationship("Manufacturer", back_populates="colognes")


class Attribute(Base):
    __tablename__ = "attributes"

    id = Column(String, primary_key=False, unique=True, index=True)
    name = Column(UnicodeText)

    # Cologne
    cologne_id = Column(String, ForeignKey("colognes.id"))
    cologne = relationship("Cologne", back_populates="attributes")
