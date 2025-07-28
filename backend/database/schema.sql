CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO todos (title, completed) VALUES
('Apprendre React', FALSE),
('Construire une app todo', FALSE),
('Déployer en production', FALSE),
('Écrire la documentation', TRUE)
ON DUPLICATE KEY UPDATE title=VALUES(title);
