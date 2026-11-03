document.addEventListener("DOMContentLoaded", function () {

    // Prevent duplicate menus
    if (document.getElementById("db-menu")) return;

    // Create menu button
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "☰";

    button.style.cssText = `
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 100002;
        background: navy;
        color: white;
        border: 3px solid white;
        border-radius: 6px;
        padding: 12px 16px;
        font-size: 22px;
        cursor: pointer;
    `;

    // Create overlay
    const menu = document.createElement("nav");
    menu.id = "db-menu";

    menu.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        background: #103b63;
        padding: 70px 12px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 12px;
        z-index: 100001;
        transform: translateY(-110%);
        visibility: hidden;
        transition: transform 0.3s ease;
        border:10px;
    `;

    // Close button
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "×";

    close.style.cssText = `
        position: absolute;
        top: 10px;
        left: 15px;
        background: transparent;
        color: white;
        border: none;
        font-size: 30px;
        cursor: pointer;
    `;

    menu.appendChild(close);

    // Navigation links
    const links = [
        ["Home", "Index.html"],
        ["About", "About us.html"],
    
        ["Apply", "Apply.html"],
        ["Contact", "Contact.html"]
    ];

    links.forEach(function (item) {
        const link = document.createElement("a");

        link.textContent = item[0];
        link.href = item[1];

        link.style.cssText = `
            color: white;
            text-decoration: none;
            padding: 10px;
            font-size: 16px;
        `;

        link.addEventListener("click", hideMenu);
        menu.appendChild(link);
    });

    // Add elements to the page
    document.body.appendChild(menu);
    document.body.appendChild(button);

    function showMenu() {
        menu.style.visibility = "visible";
        menu.style.transform = "translateY(0)";
    }

    function hideMenu() {
        menu.style.transform = "translateY(-110%)";
        menu.style.visibility = "hidden";
    }

    button.addEventListener("click", function () {
        if (menu.style.visibility === "visible") {
            hideMenu();
        } else {
            showMenu();
        }
    });

    close.addEventListener("click", hideMenu);

});