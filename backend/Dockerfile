# Use a lightweight Python version
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirement file first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the app using Gunicorn (Production server)
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]