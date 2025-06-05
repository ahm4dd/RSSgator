# RSS Feed Aggregator

A command-line RSS feed aggregator that allows you to follow RSS feeds, aggregate posts, and browse content from your terminal.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14.0 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (version 12.0 or higher)
- **Git** (for version control)

### Installing Node.js with NVM (Recommended)

1. Install NVM (Node Version Manager):
   ```bash
   # Visit NVM for the latest updates
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Restart your terminal or run:
   ```bash
   source ~/.bashrc
   ```

3. Install and use the required Node.js version:
   ```bash
   nvm install node
   nvm use node
   ```

### Installing PostgreSQL

#### On macOS (using Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### On Windows:
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### Setting up PostgreSQL Database

1. Create a database user and database:
   ```bash
   sudo -u postgres psql
   ```

2. In the PostgreSQL prompt:
   ```sql
   CREATE USER gator_user WITH PASSWORD 'your_password'; -- You have to use only one ' for this command.
   CREATE DATABASE gator_db OWNER gator_user;
   GRANT ALL PRIVILEGES ON DATABASE gator_db TO gator_user;
   \c gator_db
   -- To exit you can use the following:
   \q
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahm4dd/RSSgator.git
   cd RSSgator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Node.js version (if using NVM):
   ```bash
   nvm use
   ```

## Configuration

Create a configuration file in your home directory:

```bash
touch ~/.gatorconfig.json
```

Add the following configuration:

```json
{
  "db_url": "postgres://gator_user:your_password@localhost:5432/gator_db",
  "current_user_name": "your_username"
}
```

### Configuration Options

| Option | Type | Description | Required |
|--------|------|-------------|----------|
| `db_url` | string | PostgreSQL connection string | Yes |
| `current_user_name` | string | Your username for the application | Yes |

## Usage

> For running it for the first time you have to run the following command:
```bash
npm start run register (your_user_name)
```

Run commands using npm:

```bash
npm start run [command] [arguments]
```

## Available Commands

### User Management

#### `register`
Register a new user account.
```bash
npm start run register
```

#### `login`
Login to your account.
```bash
npm start run login
```

#### `users`
List all registered users.
```bash
npm start run users
```

### Feed Management

#### `feeds`
List all available RSS feeds.
```bash
npm start run feeds
```

#### `addfeed`
Add a new RSS feed to the system.
```bash
npm start run addfeed "Feed Name" "https://example.com/rss"
```

#### `follow`
Follow an RSS feed.
```bash
npm start run follow "https://example.com/rss"
```

#### `unfollow`
Unfollow an RSS feed.
```bash
npm start run unfollow "https://example.com/rss"
```

#### `following`
List all feeds you're currently following.
```bash
npm start run following
```

### Content Aggregation

#### `agg`
Start the RSS feed aggregation process. Requires a time interval argument.
```bash
npm start run agg "30s"    # Every 30 seconds
npm start run agg "5m"     # Every 5 minutes
npm start run agg "1h"     # Every hour
npm start run agg "2.5h"   # Every 2.5 hours
```

#### `browse`
Browse aggregated posts from your followed feeds.
```bash
npm start run browse           # Browse 2 posts only
npm start run browse 10        # Browse latest 10 posts
```

### Database Management

#### `reset`
**⚠️ WARNING**: This command truncates the users and feeds tables, removing all data.
```bash
npm start run reset
```

## Examples

Here are some common usage workflows:

```bash
# 1. Register and login
npm start run register
npm start run login

# 2. Add and follow RSS feeds
npm start run addfeed "Tech Crunch" "https://techcrunch.com/rss"
npm start run follow "https://techcrunch.com/rss"

# 3. Start aggregating content every 30 minutes
npm start run agg "30m"

# 4. Browse the latest 5 posts
npm start run browse 5

# 5. Check what feeds you're following
npm start run following

# 6. View all users and feeds
npm start run users
npm start run feeds
```

## Environment Variables

You can also use environment variables for configuration:

```bash
export GATOR_DB_URL="postgres://gator_user:password@localhost:5432/gator_db"
export GATOR_CURRENT_USER_NAME="your_username"
```

## Troubleshooting

### Common Issues

**Database connection errors**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check your connection string in the config file
- Ensure the database and user exist
- Test connection: `psql -U gator_user -d gator_db -h localhost`

**Command not found errors**
- Ensure you're in the project directory
- Run `npm install` to install dependencies
- Check if you're using the correct Node.js version with `nvm use`

**Permission errors**
- Make sure your PostgreSQL user has the correct permissions
- Check file permissions for the config file: `chmod 600 ~/.gatorconfig.json`

**RSS feed errors**
- Verify the RSS feed URL is accessible
- Check if the feed URL returns valid XML/RSS content
- Some feeds may require user-agent headers or have rate limiting

### Debug Mode

Enable debug logging:
```bash
DEBUG=gator* npm start run [command]
```

## Development


### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Local Development

```bash
# Install dependencies
npm install

# Set up your Node.js version
nvm use

# Run tests (There are no tests yet)
npm test

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/ahm4dd/RSSgator/issues)
- **Documentation**: This README
