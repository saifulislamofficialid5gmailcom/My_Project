const themeToggle = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('.nav-actions a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const contactForm = document.querySelector('.contact-form');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-actions');
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.setAttribute('aria-hidden', 'true');
document.body.prepend(scrollProgress);

if (year) {
	year.textContent = new Date().getFullYear();
}

const updateThemeControl = (isDark) => {
	if (!themeToggle) {
		return;
	}

	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
	const icon = themeToggle.querySelector('span');
	if (icon) {
		icon.textContent = isDark ? '☾' : '☼';
	}
};

let savedTheme = null;
try {
	savedTheme = localStorage.getItem('profile-theme');
} catch (error) {
	savedTheme = null;
}

if (savedTheme === 'dark') {
	document.body.classList.add('dark');
	updateThemeControl(true);
}

if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const isDark = document.body.classList.toggle('dark');
		try {
			localStorage.setItem('profile-theme', isDark ? 'dark' : 'light');
		} catch (error) {
			// Theme still works when storage is unavailable.
		}
		updateThemeControl(isDark);
	});
}

if (menuToggle && navigation) {
	menuToggle.addEventListener('click', () => {
		const isOpen = navigation.classList.toggle('menu-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
		menuToggle.querySelector('span').textContent = isOpen ? '×' : '☰';
	});

	navigation.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			navigation.classList.remove('menu-open');
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Open navigation menu');
			menuToggle.querySelector('span').textContent = '☰';
		});
	});
}

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => observer.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('visible'));
}

const setActiveNavigation = (id) => {
	navLinks.forEach((link) => {
		const isActive = link.getAttribute('href') === `#${id}`;
		link.classList.toggle('active', isActive);
		if (isActive) {
			link.setAttribute('aria-current', 'location');
		} else {
			link.removeAttribute('aria-current');
		}
	});
};

if ('IntersectionObserver' in window && sections.length) {
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setActiveNavigation(entry.target.id);
			}
		});
	}, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

	sections.forEach((section) => sectionObserver.observe(section));
}

if (contactForm) {
	const formStatus = document.createElement('p');
	formStatus.className = 'form-status';
	formStatus.setAttribute('role', 'status');
	contactForm.append(formStatus);

	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const formData = new FormData(contactForm);
		const name = String(formData.get('Name') || '').trim();
		const email = String(formData.get('Email') || '').trim();
		const subject = String(formData.get('Subject') || '').trim();
		const message = String(formData.get('Message') || '').trim();
		const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
		const mailtoUrl = `mailto:saifulislamofficialid5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		formStatus.textContent = 'Opening your email app...';
		window.location.href = mailtoUrl;
	});
}

const updateScrollProgress = () => {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
	scrollProgress.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
