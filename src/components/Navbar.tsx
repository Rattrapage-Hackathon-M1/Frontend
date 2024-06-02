import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Tasks Manager
        </Link>
        <div className="flex space-x-4">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1">
              <span>Authentification</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white text-black border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/login"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Connexion
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/signup"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Inscription
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/changepassword"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Changer le mot de passe
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/refreshtoken"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Rafraîchir le token
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/verifytoken"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Vérifier le token
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/logout"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Déconnexion
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1">
              <span>Tâches</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white text-black border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/taches"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Tâches
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/create"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Créer une Tâche
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/create"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Créer une Tâche
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1">
              <span>Utilisateurs</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white text-black border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/utilisateurs"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Utilisateurs
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/create-user"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Créer un utilisateur
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/create"
                    className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                  >
                    Créer une Tâche
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
