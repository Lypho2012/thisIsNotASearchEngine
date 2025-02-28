"""
Execute tests by running pytest
"""
from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")