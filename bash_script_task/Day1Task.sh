#!/bin/bash

# -------------------------------------------------------------
# Task 1: Directory Management
# -------------------------------------------------------------

echo "### Task 1: Directory Management ###"
# Change directory to /home
cd /home
echo "Changed directory to /home"

# Create directory named 'project_files'
if [ ! -d "project_files" ]; then
  mkdir project_files
  echo "Directory 'project_files' created."
else
  echo "Directory 'project_files' already exists."
fi
echo ""


# -------------------------------------------------------------
# Task 2: User and Group Management
# -------------------------------------------------------------

echo "### Task 2: User and Group Management ###"
# Create new group named 'developers'
if ! getent group developers; then
  groupadd developers
  echo "Group 'developers' created."
else
  echo "Group 'developers' already exists."
fi

# Create new user named 'intern_user'
if ! id "intern_user" ; then
  useradd -m intern_user
  echo "intern_user:password123" | chpasswd
  echo "User 'intern_user' created."
else
  echo "User 'intern_user' already exists."
fi

# Set password for 'intern_user'
echo "Setting password for 'intern_user'."
sudo passwd intern_user
echo ""

# Add user 'intern_user' to 'developers' group
usermod -aG developers intern_user
echo "'intern_user' added to the 'developers' group."
echo ""


# -------------------------------------------------------------
# Task 3: Permissions and Ownership
# -------------------------------------------------------------

echo "### Task 3: Permissions and Ownership ###"
# Change ownership of 'project_files' directory
chown intern_user:developers /home/luzza/project_files
echo "Ownership of 'project_files' changed to 'intern_user:developers'."

# Set appropriate permissions for 'project_files'
chmod 750 /home/luzza/project_files
echo "Permissions of 'project_files' set to 750."

# Verify the permissions changes
echo "Verifying directory permissions:"
ls -ld /home/luzza/project_files
echo ""


# -------------------------------------------------------------
# Task 4: Additional Tasks
# -------------------------------------------------------------

echo "### Task 4: Additional Tasks ###"
sudo touch /home/luzza/project_files/welcome.txt
echo "Welcome.txt file created successfully."

# Write the creation date and time to welcome.txt
echo "Creation Date: $(date)" | sudo tee /home/luzza/project_files/welcome.txt

# Append the directory path to the file
echo "Directory Path: /home/luzza/project_files" | sudo tee -a /home/luzza/project_files/welcome.txt 

# Append the owner of the directory to the file
echo "Owner: $(stat -c '%U' /home/luzza/project_files)" | sudo tee -a /home/luzza/project_files/welcome.txt

# Append the group of the directory to the file
echo "Group: $(stat -c '%G' /home/luzza/project_files)" | sudo tee -a /home/luzza/project_files/welcome.txt 

# Set appropriate permissions for welcome.txt
sudo chmod 744 /home/luzza/project_files/welcome.txts


# -------------------------------------------------------------
# Task 5: Verification
# -------------------------------------------------------------

echo "### Task 5: Verification ###"
# Verify directory creation and permissions
echo "Verifying directory creation and permissions:"
ls -ld /home/luzza/project_files
echo ""

# Verify user creation and group membership
echo "Verifying user creation and group membership:"
id intern_user
echo ""

# Verify file creation and contents
echo "Verifying file creation and contents:"
cat /home/luzza/project_files/welcome.txt
echo ""

