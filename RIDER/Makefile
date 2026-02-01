# Makefile for Rider App Test Automation
# Test runner command (adjust based on your testing framework - e.g., maestro, appium, etc.)
TEST_RUNNER ?= maestro test
TEST_DIR = flows
REGRESSION_DIR = regression
REPORT_DIR = reports
TIMESTAMP := $(shell powershell -Command "Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'")
REPORT_FILE = $(REPORT_DIR)/test-report-$(TIMESTAMP).txt
SUMMARY_FILE = $(REPORT_DIR)/test-summary-$(TIMESTAMP).txt

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
BLUE = \033[0;34m
NC = \033[0m # No Color

# Create reports directory if it doesn't exist
$(shell if not exist $(REPORT_DIR) mkdir $(REPORT_DIR))

.PHONY: help all test regression regression-run generate-summary clean report stop

# Default target
help:
	@echo "$(YELLOW)Available targets:$(NC)"
	@echo "  make help              - Show this help message"
	@echo "  make all               - Run all test suites"
	@echo "  make regression        - Run regression tests (with reporting)"
	@echo "  make report            - Generate report from last run"
	@echo "  make clean             - Clean report files"
	@echo "  make stop              - Stop running regression tests (Ctrl+C also works)"
	@echo ""
	@echo "$(YELLOW)Test Suites:$(NC)"
	@echo "  make login             - Run all Login tests"
	@echo "  make register          - Run all Registration tests"
	@echo "  make profile           - Run all Profile tests"
	@echo "  make settings          - Run all Settings tests"
	@echo "  make ride-requests     - Run all Ride Requests tests"
	@echo "  make activity          - Run all Activity tests"
	@echo "  make logout            - Run Logout test"
	@echo "  make delete            - Run Delete user test"
	@echo ""
	@echo "$(YELLOW)Individual Test Categories:$(NC)"
	@echo "  make login-valid       - Run valid login tests"
	@echo "  make login-invalid     - Run invalid login tests"
	@echo "  make profile-email     - Run profile email tests"
	@echo "  make profile-name      - Run profile name tests"
	@echo "  make profile-phone     - Run profile phone tests"
	@echo "  make profile-photo     - Run profile photo tests"
	@echo "  make settings-addresses - Run MyAddresses tests"
	@echo "  make settings-language  - Run Language change tests"
	@echo "  make settings-theme     - Run Theme change tests"
	@echo "  make settings-additional - Run Additional settings tests"
	@echo "  make ride-type         - Run RideType tests"
	@echo "  make truck-type        - Run TruckType tests"
	@echo "  make evacuator-type    - Run EvacuatorType tests"

# Run all tests
all:
	@echo "$(GREEN)Running all test suites...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Login/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Register/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Profile/**/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Settings/**/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/RideRequests/**/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Activity/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/LogOut/*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Delete/*.yaml

# Stop flag file for graceful stopping
STOP_FLAG = .stop_regression

# Regression tests - continues even if some tests fail
# To stop: Press Ctrl+C or run 'make stop' in another terminal
regression:
	@if exist $(STOP_FLAG) (del $(STOP_FLAG) 2>nul)
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(GREEN)Running Regression Test Suite$(NC)"
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(BLUE)Report will be saved to: $(REPORT_FILE)$(NC)"
	@echo ""
	@echo "$(YELLOW)Note: Tests will continue running even if some fail.$(NC)"
	@echo "$(YELLOW)A summary report will be generated at the end.$(NC)"
	@echo "$(YELLOW)To stop: Press Ctrl+C or run 'make stop' in another terminal$(NC)"
	@echo ""
	@$(MAKE) regression-run > $(REPORT_FILE) 2>&1 || echo ""
	@if exist $(STOP_FLAG) (del $(STOP_FLAG) 2>nul && echo "$(YELLOW)Regression stopped by user request.$(NC)") else (type $(REPORT_FILE) && $(MAKE) generate-summary REPORT=$(REPORT_FILE) SUMMARY=$(SUMMARY_FILE))
	@echo ""
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(GREEN)Regression tests completed!$(NC)"
	@echo "$(GREEN)Full report: $(REPORT_FILE)$(NC)"
	@echo "$(GREEN)Summary: $(SUMMARY_FILE)$(NC)"
	@echo "$(GREEN)========================================$(NC)"

# Internal regression target that runs all tests
# Using || true to continue even if tests fail
# Checks for stop flag between test suites
regression-run:
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo "$(GREEN)[1/9] Running Activity tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Activity/*.yaml || (echo "$(RED)Activity tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[2/9] Running Login tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Login/*.yaml || (echo "$(RED)Login tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[3/9] Running LogOut tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/LogOut/*.yaml || (echo "$(RED)LogOut tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[4/9] Running Profile Email tests (excluding delete-email and valid-email-change)...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Profile/Email/already-registered-email-change.yaml || (echo "$(RED)already-registered-email-change: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@$(TEST_RUNNER) $(TEST_DIR)/Profile/Email/invalid-email-change.yaml || (echo "$(RED)invalid-email-change: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[5/9] Running Profile Name tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Profile/Name/*.yaml || (echo "$(RED)Profile Name tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[6/9] Running Profile PhoneNumber tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Profile/PhoneNumber/*.yaml || (echo "$(RED)Profile PhoneNumber tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[7/9] Running Profile Photo tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Profile/ProfilePhoto/*.yaml || (echo "$(RED)Profile Photo tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[8/9] Running Register tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Register/*.yaml || (echo "$(RED)Register tests: FAILED$(NC)" && exit 0)
	@if exist $(STOP_FLAG) (echo "$(YELLOW)Stop requested, skipping remaining tests...$(NC)" && exit 0)
	@echo ""
	@echo "$(GREEN)[9/9] Running Settings tests...$(NC)"
	@$(TEST_RUNNER) $(TEST_DIR)/Settings/**/*.yaml || (echo "$(RED)Settings tests: FAILED$(NC)" && exit 0)

# Stop regression tests gracefully
stop:
	@echo "$(YELLOW)Requesting regression tests to stop...$(NC)"
	@echo. > $(STOP_FLAG)
	@echo "$(GREEN)Stop flag created. Tests will stop after current suite completes.$(NC)"
	@echo "$(YELLOW)Note: If tests don't stop, you can also press Ctrl+C$(NC)"

# Generate summary report
generate-summary:
	@echo "$(GREEN)Generating test summary...$(NC)"
	@echo "=========================================" > $(SUMMARY_FILE)
	@echo "RIDER APP - REGRESSION TEST SUMMARY" >> $(SUMMARY_FILE)
	@echo "=========================================" >> $(SUMMARY_FILE)
	@echo "Date: $(TIMESTAMP)" >> $(SUMMARY_FILE)
	@echo "" >> $(SUMMARY_FILE)
	@echo "Test Suites Executed:" >> $(SUMMARY_FILE)
	@echo "  1. Activity" >> $(SUMMARY_FILE)
	@echo "  2. Login" >> $(SUMMARY_FILE)
	@echo "  3. LogOut" >> $(SUMMARY_FILE)
	@echo "  4. Profile/Email (excluding delete-email.yaml and valid-email-change.yaml)" >> $(SUMMARY_FILE)
	@echo "  5. Profile/Name" >> $(SUMMARY_FILE)
	@echo "  6. Profile/PhoneNumber" >> $(SUMMARY_FILE)
	@echo "  7. Profile/ProfilePhoto" >> $(SUMMARY_FILE)
	@echo "  8. Register" >> $(SUMMARY_FILE)
	@echo "  9. Settings" >> $(SUMMARY_FILE)
	@echo "" >> $(SUMMARY_FILE)
	@echo "Full report: $(REPORT_FILE)" >> $(SUMMARY_FILE)
	@echo "=========================================" >> $(SUMMARY_FILE)
	@echo "$(GREEN)Summary report generated: $(SUMMARY_FILE)$(NC)"

# Login tests
login:
	@echo "$(GREEN)Running Login tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Login/*.yaml

login-valid:
	@echo "$(GREEN)Running valid login tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Login/login-with-valid-*.yaml

login-invalid:
	@echo "$(GREEN)Running invalid login tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Login/login-with-invalid-*.yaml
	$(TEST_RUNNER) $(TEST_DIR)/Login/login-with-not-registered-*.yaml

# Registration tests
register:
	@echo "$(GREEN)Running Registration tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Register/*.yaml

# Profile tests
profile:
	@echo "$(GREEN)Running Profile tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Profile/**/*.yaml

profile-email:
	@echo "$(GREEN)Running Profile Email tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Profile/Email/*.yaml

profile-name:
	@echo "$(GREEN)Running Profile Name tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Profile/Name/*.yaml

profile-phone:
	@echo "$(GREEN)Running Profile Phone tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Profile/PhoneNumber/*.yaml

profile-photo:
	@echo "$(GREEN)Running Profile Photo tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Profile/ProfilePhoto/*.yaml

# Settings tests
settings:
	@echo "$(GREEN)Running Settings tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Settings/**/*.yaml

settings-addresses:
	@echo "$(GREEN)Running MyAddresses tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Settings/MyAddresses/*.yaml

settings-language:
	@echo "$(GREEN)Running Language change tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Settings/LanguageChange/*.yaml

settings-theme:
	@echo "$(GREEN)Running Theme change tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Settings/ThemeChange/*.yaml

settings-additional:
	@echo "$(GREEN)Running Additional settings tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Settings/Additional/*.yaml

# Ride Requests tests
ride-requests:
	@echo "$(GREEN)Running Ride Requests tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/RideRequests/**/*.yaml

ride-type:
	@echo "$(GREEN)Running RideType tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/RideRequests/RideType/*.yaml

truck-type:
	@echo "$(GREEN)Running TruckType tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/RideRequests/TruckType/*.yaml

evacuator-type:
	@echo "$(GREEN)Running EvacuatorType tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/RideRequests/EvacuatorType/*.yaml

# Activity tests
activity:
	@echo "$(GREEN)Running Activity tests...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/Activity/*.yaml

# Logout test
logout:
	@echo "$(GREEN)Running Logout test...$(NC)"
	$(TEST_RUNNER) $(TEST_DIR)/LogOut/*.yaml

# Delete user test
# delete:
# 	@echo "$(GREEN)Running Delete user test...$(NC)"
# 	$(TEST_RUNNER) $(TEST_DIR)/Delete/*.yaml

# Generate a report from existing log
report:
	@if exist $(REPORT_FILE) ($(MAKE) generate-summary REPORT=$(REPORT_FILE) SUMMARY=$(SUMMARY_FILE)) else (echo "$(RED)No report file found. Run 'make regression' first.$(NC)")

# Clean reports directory and stop flags
clean:
	@echo "$(YELLOW)Cleaning up reports and stop flags...$(NC)"
	@if exist $(STOP_FLAG) (del $(STOP_FLAG) 2>nul)
	@if exist $(REPORT_DIR) (del /Q $(REPORT_DIR)\*.* 2>nul && echo "$(GREEN)Reports cleaned.$(NC)") else (echo "$(YELLOW)No reports directory found.$(NC)")

