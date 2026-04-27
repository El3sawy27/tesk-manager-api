const fetch = globalThis.fetch;

const baseUrl = "http://localhost:5000";

const randomEmail = `test+${Date.now()}@example.com`;
const password = "Password123!";

const log = (label, data) => {
    console.log(`\n=== ${label} ===`);
    console.log(JSON.stringify(data, null, 2));
};

const run = async () => {
    try {
        const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: randomEmail, password })
        });
        const registerBody = await registerRes.json();
        log("Register", { status: registerRes.status, body: registerBody });

        if (!registerRes.ok) {
            throw new Error("Register failed");
        }

        const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: randomEmail, password })
        });
        const loginBody = await loginRes.json();
        log("Login", { status: loginRes.status, body: loginBody });

        if (!loginRes.ok) {
            throw new Error("Login failed");
        }

        const token = loginBody.data?.token;
        if (!token) {
            throw new Error("No token returned");
        }

        const authHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

        const createProjectRes = await fetch(`${baseUrl}/api/projects`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify({ name: "Test Project" })
        });
        const createProjectBody = await createProjectRes.json();
        log("Create Project", { status: createProjectRes.status, body: createProjectBody });

        if (!createProjectRes.ok) {
            throw new Error("Create project failed");
        }

        const projectId = createProjectBody.data?._id;
        if (!projectId) throw new Error("Project ID missing");

        const listProjectsRes = await fetch(`${baseUrl}/api/projects`, { headers: authHeader });
        const listProjectsBody = await listProjectsRes.json();
        log("List Projects", { status: listProjectsRes.status, body: listProjectsBody });

        if (!listProjectsRes.ok) throw new Error("List projects failed");

        const createTaskRes = await fetch(`${baseUrl}/api/tasks/${projectId}`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify({ title: "Test Task", priority: "medium", status: "todo" })
        });
        const createTaskBody = await createTaskRes.json();
        log("Create Task", { status: createTaskRes.status, body: createTaskBody });

        if (!createTaskRes.ok) throw new Error("Create task failed");

        const taskId = createTaskBody.data?._id;
        if (!taskId) throw new Error("Task ID missing");

        const listTasksRes = await fetch(`${baseUrl}/api/tasks/${projectId}?page=1&limit=5`, { headers: authHeader });
        const listTasksBody = await listTasksRes.json();
        log("List Tasks", { status: listTasksRes.status, body: listTasksBody });

        if (!listTasksRes.ok) throw new Error("List tasks failed");

        const addCommentRes = await fetch(`${baseUrl}/api/comments/${taskId}`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify({ content: "This is a test comment." })
        });
        const addCommentBody = await addCommentRes.json();
        log("Add Comment", { status: addCommentRes.status, body: addCommentBody });

        if (!addCommentRes.ok) throw new Error("Add comment failed");

        console.log("\nAll endpoint tests completed successfully.");
    } catch (err) {
        console.error("Test run failed:", err);
        process.exit(1);
    }
};

run();
