document.addEventListener("DOMContentLoaded", () => {
	const preloader = document.getElementById("preloader");
	const menuButton = document.getElementById("menuBtn");
	const navMenu = document.querySelector(".nav-menu");
	const typingElement = document.getElementById("typing");
	const navLinks = document.querySelectorAll(".nav-link");
	const progressBars = document.querySelectorAll(".progress-bar");
	const backToTop = document.getElementById("backToTop");
	const particleField = document.querySelector(".particle-field");
	const revealSections = document.querySelectorAll(".reveal-section");
	const counters = document.querySelectorAll(".counter");

	window.addEventListener("load", () => {
		preloader?.classList.add("hide");
	});

	menuButton?.addEventListener("click", () => {
		navMenu?.classList.toggle("show");
		menuButton.setAttribute("aria-expanded", navMenu?.classList.contains("show") ? "true" : "false");
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navMenu?.classList.remove("show");
			menuButton?.setAttribute("aria-expanded", "false");
		});
	});

	if (typingElement) {
		const roles = ["Student Developer", "Web Developer", "Problem Solver"];
		let roleIndex = 0;
		let characterIndex = 0;
		let deleting = false;

		const typeRole = () => {
			const role = roles[roleIndex];
			typingElement.textContent = role.slice(0, characterIndex);

			if (!deleting && characterIndex < role.length) {
				characterIndex += 1;
				window.setTimeout(typeRole, 100);
				return;
			}

			if (!deleting && characterIndex === role.length) {
				deleting = true;
				window.setTimeout(typeRole, 1400);
				return;
			}

			if (characterIndex > 0) {
				characterIndex -= 1;
				window.setTimeout(typeRole, 55);
				return;
			}

			deleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
			window.setTimeout(typeRole, 250);
		};

		typeRole();
	}

	progressBars.forEach((bar) => {
		bar.style.width = bar.dataset.width || "0%";
	});

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		revealSections.forEach((section) => revealObserver.observe(section));
	} else {
		revealSections.forEach((section) => section.classList.add("is-visible"));
	}

	const animateCounter = (counter) => {
		const target = Number(counter.dataset.target || 0);
		const suffix = counter.dataset.suffix || "";
		const duration = 1200;
		const startTime = performance.now();

		const updateCounter = (currentTime) => {
			const progress = Math.min((currentTime - startTime) / duration, 1);
			const value = Math.floor(progress * target);
			counter.textContent = `${value}${suffix}`;

			if (progress < 1) {
				requestAnimationFrame(updateCounter);
			}
		};

		requestAnimationFrame(updateCounter);
	};

	if ("IntersectionObserver" in window) {
		const counterObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		counters.forEach((counter) => counterObserver.observe(counter));
	} else {
		counters.forEach(animateCounter);
	}

	window.addEventListener("scroll", () => {
		backToTop?.classList.toggle("visible", window.scrollY > 500);
	});

	backToTop?.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	const sectionLinks = new Map(
		[...navLinks]
			.map((link) => [link.getAttribute("href")?.slice(1), link])
			.filter(([sectionId]) => sectionId)
	);

	if ("IntersectionObserver" in window) {
		const activeLinkObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && sectionLinks.has(entry.target.id)) {
					navLinks.forEach((link) => link.classList.remove("active"));
					sectionLinks.get(entry.target.id)?.classList.add("active");
				}
			});
		}, { rootMargin: "-35% 0px -55%", threshold: 0 });

		["home", "about", "skills", "projects", "contact"].forEach((sectionId) => {
			const section = document.getElementById(sectionId);
			if (section) activeLinkObserver.observe(section);
		});
	}

	if (particleField) {
		for (let index = 0; index < 28; index += 1) {
			const particle = document.createElement("span");
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.animationDelay = `${Math.random() * 8}s`;
			particle.style.setProperty("--duration", `${8 + Math.random() * 12}s`);
			particleField.appendChild(particle);
		}
	}
});
