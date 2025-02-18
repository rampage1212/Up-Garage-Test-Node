# Z2O Cloud Challenge Client

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A Node.js client application for participating in the Z2O Cloud Challenge. This client automatically handles the challenge workflow by making API calls to the Z2O Cloud Challenge server.

## 🚀 Features

- Automatic challenge initialization
- Intelligent timing management for API calls
- Real-time response handling
- Error handling and debugging information
- Challenge completion verification

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd z2o-challenge
```

2. Install dependencies:

```bash
npm install
```

## 💻 Usage

1. Set your nickname in the `index.js` file:

```javascript
const NICKNAME = "your-nickname";
```

2. Run the application:

```bash
npm start
```

## 🔄 How It Works

The client follows these steps:

1. **Challenge Initialization**

   - Makes a POST request to start the challenge
   - Receives initial challenge data

2. **Challenge Loop**

   - Monitors the `actives_at` timestamp
   - Waits for the appropriate time to make the next request
   - Sends PUT requests with the challenge ID
   - Processes response data

3. **Challenge Completion**
   - Detects when the challenge is completed
   - Displays the result and success URL if available

## 📊 API Endpoints

- `POST /challenges`: Initiates a new challenge
- `PUT /challenges`: Updates challenge progress

## 🔧 Configuration

The base URL for the API can be configured by modifying the `BASE_URL` constant in `index.js`:

```javascript
const BASE_URL = "http://challenge.z2o.cloud";
```

## 📝 Error Handling

The application includes comprehensive error handling:

- Network request errors
- API response errors
- Invalid response data handling

## 📦 Dependencies

- [axios](https://github.com/axios/axios): Promise-based HTTP client for making API requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- Z2O Cloud for providing the challenge platform
- The Axios team for their excellent HTTP client library
