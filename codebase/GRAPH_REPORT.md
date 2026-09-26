# Graph Report - backend  (2026-09-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 24638 nodes · 60404 edges · 894 communities (676 shown, 218 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 4178 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93e7efaa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- main.py
- product_ingestion/extract.py
- test_spec_generator.py
- assistant.py
- test_model_policy.py
- aec/router.py
- _el
- ModelIndex
- FirmDocument
- hub_tenancy.py
- test_circuit_helpers.py
- test_slack_router.py
- test_teams_router.py
- RedisStore
- test_schedule_helpers.py
- get_or_refresh_category
- test_authz_share_authority.py
- client_keys.py
- proxy_sdk_resource
- get_store
- UserRole
- test_cross_firm_share_api.py
- teams/router.py
- autodesk_first.py
- integrations/config.py
- test_phase9_product_ingestion_governance.py
- proxy_router.py
- EnforcementMode
- product_review_service.py
- aps/router.py
- get_user_uuid
- ProductRecord
- RevitLinkError
- assert_project_access
- test_acc_role_sync.py
- test_panel_schedule.py
- test_firm_onboarding.py
- UserFirmMembership
- ModelVersion
- EntitlementCache
- RelationshipPrewarmJob
- FirmAllowedHub
- AsyncTTLCache
- account_router.py
- test_autodesk_first_cache_tier.py
- test_shared_parameters_registry.py
- db/models.py
- admin_router.py
- _scenario_harness.py
- access_cache.py
- graph_analysis.py
- record_decision
- test_phase9_product_ingest_e2e.py
- track2_content_router.py
- cache_reconcile.py
- test_slack_pairing_db.py
- _client
- acceptance.py
- build_equipment_rows
- UsageEvent
- test_emergency_deny.py
- aec/client.py
- personal_assistant.py
- test_usage_ledger_1b.py
- product_records.py
- test_authz_share_optin_boundary.py
- test_help_library.py
- test_membership_draft_gating.py
- identity_router.py
- test_model_resolve.py
- Firm
- test_qa_engine.py
- test_autodesk_first_aps_share.py
- test_change_set_service.py
- test_model_budget_rollup.py
- WriteApproval
- test_model_budget.py
- test_production_readiness_preflight.py
- AecUpstreamError
- test_relationships.py
- test_w9b_followup.py
- check_firm_view_editor
- assistant_tools.py
- _check_once
- test_authz_principals_repo.py
- test_integrations_config.py
- test_spatial_relationships.py
- sdk_proxy.py
- test_pdp_g1_sdk_proxy_core.py
- _clear_flags
- schema_persist.py
- ProjectHubCache
- test_nl_filter_routing.py
- native_adapter.py
- _mock_db
- test_firm_docs_unit.py
- assistant_parameter_writes.py
- change_set_router.py
- product_ingest_worker.py
- test_admin_router.py
- test_enrichment_mapping.py
- test_phase9_product_ingest_worker.py
- derivative_proxy.py
- test_context_search.py
- spec_generator.py
- test_change_set_router.py
- test_phase9_product_ingestion_extract.py
- assemble_architectural_sheet_list_schedule
- test_artifact_producer.py
- test_authz_principal.py
- authz_request_scope
- test_live_filter.py
- test_phase1_safety.py
- test_authz_acl_source.py
- DataClassification
- teams/pairing.py
- test_prewarm_worker.py
- test_phase9_element_product_bindings.py
- test_membership_lifecycle_cascade.py
- make_leaf
- admin_delegation_router.py
- cli_gate
- ProjectShareGrant
- EngineKind
- env_flag
- hash_id
- membership.py
- Rule
- ResourceRecord
- test_assistant_parameter_writes.py
- _normalize_element
- test_change_set_lifecycle_events.py
- test_lifecycle_dispatch.py
- test_teams_pairing_db.py
- test_view_render_mode.py
- guard_derived_read
- UpstreamResponse
- test_pdp_g1_sdk_proxy_tenancy.py
- access.py
- test_phase9_product_ingestion_v06_rules.py
- test_w9_lane_f_regressions.py
- test_circuit_schedule.py
- test_budget_reservation_dblane.py
- test_nl_filter_validation.py
- b4d7e2f9c1a3_phase9_firm_owned_bindings.py
- migrate.py
- fixture
- share_authority.py
- test_assistant_model_routing.py
- scheduler.py
- artifacts_router.py
- test_identity_router.py
- test_seed_writer.py
- CredentialSelection
- product_bindings.py
- test_chat_gate_cache_only_dblane.py
- test_model_policy_router.py
- test_assistant_write_guard.py
- _el
- test_integrations_readiness.py
- test_assistant_loop.py
- test_admin_auth.py
- test_assistant_parameter_writes_dblane.py
- lifecycle_router.py
- test_client_ip.py
- QaAnalysisRun
- test_qa_overrides.py
- test_transformer_schedule.py
- sqlalchemy
- _build
- test_artifacts_router.py
- test_authz_share_owner_liveness.py
- authz_telemetry.py
- test_router.py
- test_teams_security.py
- _fake_token
- test_categories_cache.py
- test_aps_cache.py
- test_phase9_product_bindings_router.py
- test_firm_docs_cka_authz_dblane.py
- ApsWriteError
- ClientBudget
- test_type_grain_rollup.py
- product_review_router.py
- test_assistant_tools.py
- serving.py
- help_library.py
- test_scope_guards.py
- test_param_aliases.py
- test_schema_persist.py
- ManifestCache
- test_w9b_review_fixes.py
- test_teams_client.py
- test_aps_read_token_refresh_leak.py
- test_log_redaction.py
- FakeProvisioningClient
- test_admin_delegation_router.py
- test_circuits.py
- test_classification_enrichment.py
- test_coordination_report.py
- production_readiness.py
- test_autodesk_first_d1_all_grants.py
- test_consent.py
- record_badge_use
- test_track2_content_authz.py
- test_filter_eval.py
- model_discovery.py
- test_qa_router.py
- bench_derivative_proxy.py
- ChangeSet
- uuid
- test_synthetic_seed_optin_guard.py
- test_effective_access.py
- test_identity_link_flow.py
- firm_docs_router.py
- test_cold_load_perf.py
- pytest
- test_qa_ids_import.py
- test_aps_hub_isolation.py
- test_autodesk_first_read_paths.py
- test_change_set_mutation_hardening.py
- test_track2_content_router.py
- test_ai_context_policy_router.py
- test_phase9_product_ingest_jobs_router.py
- test_assistant_conversations_endpoint.py
- test_autodesk_first_routes.py
- test_enrollment_endpoints.py
- test_pane_pairing_endpoints.py
- test_pdp_containment.py
- test_qa_history_capture_purge.py
- effective_access.py
- test_authz_health_query.py
- test_cross_model_join_doors.py
- sanitize_filename
- test_sync_token.py
- nl_filter_harness.py
- test_assistant_resume.py
- test_w7_telemetry_hooks.py
- test_cache_reconcile.py
- test_conversation_store.py
- test_level_host_pattern_unit.py
- test_ai_context_policy.py
- test_boot_shared_state_guard.py
- test_pane_pairing.py
- test_seed_planner.py
- qa/router.py
- revit_link/audit.py
- enforcement.py
- canonical_key
- _create
- nl_filter_monitor.py
- test_lock_order_dblane.py
- _patch_number_check_upstream
- build_request
- schema.py
- test_cloud_ids.py
- test_teams_manifest_and_tools.py
- test_cross_model_join.py
- test_health_shared_state_readiness.py
- budget_reservation.py
- build_native_circuit_rows
- get_element_group_at_tip
- service.py
- lifecycle_dispatch.py
- test_preflight_user_roles.py
- if_none_match_matches
- run_matrix.py
- test_relay_boundary.py
- test_sim_artifacts_autodesk_first.py
- test_wave7_automation.py
- _Request
- test_autodesk_first_workers.py
- test_change_set_router_type_target.py
- test_login_firm_autolink.py
- build_plan
- test_authz_reconcile.py
- test_authz_membership_backfill.py
- lifecycle_messages.py
- test_geometry_decode.py
- readiness.py
- test_structural_framing_schedule.py
- onboarding_router.py
- test_admin_integration_readiness.py
- test_phase9_product_review_router.py
- fetch_ops_metrics
- fetch_shadow_observation
- test_db_safety.py
- test_membership_gate.py
- seed_world
- _FakeSession
- production_posture.py
- _clear_firm_hub_grants
- test_architectural_window_schedule.py
- test_assistant_context.py
- assistant_write_tools.py
- test_change_set_apply_boundary.py
- exports.py
- test_stale_sweep_worker.py
- test_effective_access_migration.py
- re
- test_issues_join_probe.py
- live_filter.py
- encrypt_blob
- router
- _stub_live_read
- test_assistant_live_read.py
- _Client
- test_pdp_g1_proxy_router.py
- lifespan
- test_assistant_thinking.py
- usage_logger.py
- test_identity_link_login.py
- resolve_project_rules
- test_spec_render.py
- _prod_posture
- sync_token.py
- test_pdp_g1_proxy_tenancy.py
- test_native_adapter_aec9.py
- _Block
- test_auth_identity_exemptions.py
- test_qa_migrations_idempotent.py
- test_service_badge.py
- cross_model_join.py
- test_model_index_discovery.py
- prewarm_worker.py
- test_elements_etag.py
- test_entrypoint_firm_docs.py
- test_auth_login_state.py
- test_change_set_list_and_discard.py
- test_firm_docs_routes_dblane.py
- test_personal_assistant_endpoint.py
- _human_summary
- seed_project
- test_artifacts_provenance.py
- test_shadow_window.py
- compute_cost
- test_lifecycle_dispatch_pure.py
- test_interiors_furniture_schedule.py
- product_bindings_router.py
- ProjectConfig
- test_schedule_endpoints_preparing.py
- manifest.template.json
- TestRelayFrameGuard
- test_autodesk_first_d1b_revert_gate.py
- test_get_user_token_refresh.py
- test_migration_phase9_firm_owned_bindings.py
- test_migration_phase9_product_identity_integrity.py
- test_nl_filter_ai_context_policy.py
- test_w7_redaction.py
- test_geometry_fetch.py
- test_nl_filter_grounding.py
- build_structural_column_rows
- test_nl_filter_rate_limit.py
- parametrize
- test_help_wave4_discoverability.py
- TestMigrationFile
- test_wizard_consent_identity.py
- test_xlsx_export.py
- test_last_editor_lifecycle_paths_dblane.py
- build_architectural_door_rows
- test_architectural_room_finish_schedule.py
- test_ops_metrics.py
- build_mechanical_air_terminal_rows
- build_mechanical_equipment_rows
- test_nav_handle.py
- build_structural_foundation_rows
- is_suppressed_element
- secure_cookies_enabled
- test_autodesk_first_actors.py
- _login
- test_editor_recovery_cli.py
- test_teams_pairing_store.py
- ai_context_policy_router.py
- build_architectural_wall_type_rows
- _persist_category_rows
- discipline_field_probe.py
- test_help_corpus_guard.py
- test_migration_phase9_element_product_bindings.py
- param_aliases.py
- enqueue
- product_binding_refresh.py
- test_qa_discipline.py
- test_cfgb_posture_and_aps_boot.py
- TestClient
- test_2legged_token.py
- _StubDb
- test_migration_phase9_firm_product_reviews.py
- TestNamedDeliverableOrmExposure
- test_reclaim.py
- GateTests
- build_plumbing_fixture_rows
- test_migration_phase9_nullable_canonical_key.py
- test_assistant_endpoint.py
- test_gql_client.py
- test_groups_views_hub_isolation.py
- test_migration_phase9_ingestion_provenance.py
- EditLog
- artifacts_repo.py
- test_merge_linked_room_columns.py
- digest.py
- classify_discipline
- test_explore_allowlist.py
- build_fire_protection_sprinkler_rows
- relationships_fetch.py
- test_revit_context_injection.py
- test_authz_enforce_keystone.py
- _FakeProvClient
- test_admin_router_audit_edits.py
- test_assistant_nav_firm_scope_dblane.py
- test_change_set_separate_approver_d2.py
- test_grant_refused_on_inactive_firm.py
- test_integrations_control_plane.py
- test_integrations_setup_doc_contract.py
- test_pairing_block_metric.py
- test_phase9_refresh_integration.py
- test_w9_int.py
- audit_stream_worker.py
- build_ict_communication_device_rows
- asyncio
- favorites_router.py
- test_logging_config.py
- verify_request
- test_authz_lifecycle_router.py
- test_authz_telemetry.py
- _seed_model_version
- test_change_set_separate_approver_flag.py
- test_filter_observations.py
- test_migration_phase9_replay_identity.py
- test_property_map_cache.py
- build_project_context
- test_artifacts_authz.py
- _static_firm_id
- test_qa_coordination_report_router.py
- _check_separate_approver
- test_nl_filter_monitor.py
- test_refresh_lock_per_sid.py
- test_urn_project_binding.py
- resolve_ai_context_policy
- TestRevertLegacyProjectBinding
- test_domain_names.py
- test_model_boot_guard.py
- revit_context.py
- available_sections
- _route_handlers
- test_firm_literal_gate_gap.py
- test_wire_contract_vectors.py
- test_aps_discovery_tombstone.py
- _stub_phase6
- _FakeMessages
- test_assistant_models_membership_gate.py
- test_autodesk_first_unit.py
- test_firm_docs_upload_gaps_dblane.py
- build_ict_av_rows
- test_aps_auth_gate.py
- _budget
- fixture
- test_firm_docs_policy_unit.py
- test_panel_schedule_preparing.py
- world
- test_relationships_durable.py
- test_search_hub_isolation.py
- build_system_blocks
- load_firm_policy
- IntegrationRegistration
- acquire_or_wait
- test_nl_filter_eval_contract.py
- _patch_user_gate
- test_change_set_review_transitions.py
- owner
- test_groups_403_ordering.py
- test_pane_pairing_index.py
- _Store
- test_request_context.py
- test_rollout_diagnostics.py
- test_discipline_field_probe.py
- _Session
- sync_field_mappings_from_registry
- format_health_csv
- _clean_runs
- _build_fastapi_stub
- circuit_readability_harness.py
- test_relay_error_map.py
- test_allowlist_subsystem_removed.py
- _client
- test_assistant_navigation_resolve.py
- test_pane_session_visibility.py
- test_relationships_singleflight.py
- test_row_locks_groups_change_sets.py
- section_for_category
- test_circuit_readability_eval.py
- test_aec_token_refresh_classification.py
- _FakeSession
- _IndexedHubQuery
- ht
- test_personal_workspace_migration_downgrade.py
- test_switchboard_distribution_endpoint.py
- fixture
- test_transformer_endpoint.py
- test_version_check_worker.py
- test_change_set_events_pure.py
- test_aps_dead_lineage.py
- test_authz_child_filtering.py
- test_authz_live_read_resume_enforce.py
- _ns
- _instrument_gates
- test_guard_emergency_deny.py
- _FakeQuery
- test_issues_probe_route.py
- test_nl_filter_contract_boundary.py
- test_schedule_pool_coverage.py
- test_search_preparing.py
- test_change_set_outcome_summary_pure.py
- main
- normalize_domain
- request_context.py
- has_spec_library
- _check_cross_firm_sharing_proxy_safety
- State
- test_scenario_cross_firm_share.py
- test_assistant_error_sanitized.py
- test_auth_status_resilience.py
- world
- wiring
- test_conftest_router_skip_detector.py
- test_groups_views_404_oracle.py
- _download_class
- test_probe_origin_anomaly.py
- test_receptacle_endpoint.py
- test_relationships_memory.py
- assistant_context.py
- preview_current_parameter_value
- test_change_set_history_event_pure.py
- TxtResolver
- firm_docs/extract.py
- integrations/policy.py
- generate_xlsx
- e6b2d8f1a9c3_phase9_product_identity_integrity.py
- _run
- test_data_routes_require_hub_id.py
- test_element_counts_endpoint.py
- test_hub_id_query_min_length.py
- test_migration_firm_doc_capability_live_unique.py
- test_provider_tool_use_is_refused_closed
- _chat
- test_tip_cache.py
- assistant_schemas.py
- aadf3ce41b1c_user_roles_firm_scoped_pk.py
- c7d8e9f0a1b2_add_personal_workspace.py
- _make_client
- _PureLaneSessionStub
- _FakeQuery
- test_groups_views_personal_samefirm_existence_oracle.py
- _FakeDB
- World
- _ScriptedQuery
- test_synthetic_load_host_guard_pure.py
- TxtLookupError
- generate
- revit_link/conftest.py
- _FakeAsyncClient
- test_authz_audit_firmid_normalization.py
- _PredicateQuery
- _Autodesk
- test_backfill_apply_guard.py
- _BurnStore
- test_smoke_boot.py
- UploadFileSourceContainmentTests
- BuildingTypesTests
- c4e7a2b91d38_staged_change_family_type_target.py
- worker_urls
- test_aec_module_identity.py
- _PolicyStore
- test_assistant_check_model_health.py
- _resume
- test_chat_exhausted_budget_downgrades_and_says_so_on_the_wire
- test_chat_threads_one_session_through_the_preflight_and_three_firm_reads
- test_assistant_query_edit_log.py
- _decide
- test_migration_aec_schema_cache.py
- test_sec2_auth_ordering.py
- test_security_batch_a.py
- test_security_c1_sessions.py
- _NetworkFailThenDeleteFailsClient
- TransportPermanentError
- test_handle_resolution_rechecks_current_policy
- 3aa734cda334_model_routing_usage_ledger.py
- s9t0u1v2w3x4_add_cache_reconcile_state.py
- w3x4y5z6a7b8_fav_firm_key_and_enroll_index.py
- test_auth_logout_csrf.py
- test_no_production_caller_declares_required
- _events
- parametrize
- test_revert_on_entitlement_runs_before_any_gate_session_is_open
- _body
- _body
- _load
- test_support_fastpath.py
- match_wave
- b7c8d9e0f1a2_cka_document_scope_classification.py
- f5a6b7c8d9e0_add_phase3_10a_room_join_geometry_cache.py
- l2m3n4o5p6q7_add_canonical_principals.py
- AST
- test_models_uses_server_resolved_firm_id_never_a_client_supplied_one
- test_auth_issuer.py
- test_auth_roles_alias.py
- _Aps
- _body
- test_prewarm_on_layer1_proof_from_job_one_is_not_visible_in_job_two
- test_cross_firm_share_detail_strings_frontend_pin.py
- test_env_example_documents_backend_env_names.py
- test_gunicorn_launch_config.py
- test_redis_degraded_mode.py
- _scoped_hubs
- contract.py
- 1f7f44253c51_add_bimpossible_role_to_memberships.py
- 80af6ebc3df5_firm_scope_ai_context_policy.py
- 9329a1e7be85_add_slack_gateway_bindings.py
- 9c9a59a39d64_staged_change_typed_values.py
- a4c123b1612d_add_firm_model_policy.py
- a7c1e93f4b28_add_teams_gateway_bindings.py
- b24de6f81c35_edit_log_change_set_linkage.py
- c7d2e9f4a1b6_drop_firm_aps_hub_id.py
- d2e3f4a5b6c7_add_model_index_deleted_at.py
- d5f8b3c41e27_revit_link_request_log_firm_id.py
- e5f6a7b8c9d1_firm_doc_capability_live_unique.py
- j0k1l2m3n4o5_add_hub_access_scope_and_firm_allowed_projects.py
- n4o5p6q7r8s9_add_artifact_drafts_and_provenance.py
- q7r8s9t0u1v2_add_authz_decision_actor_type.py
- r8s9t0u1v2w3_add_identity_link_states.py
- z8a9b0c1d2e3_rename_assistant_digests_created_at.py
- _cipher
- _clean_integration_env
- _FakeBlock
- _FakeStore
- test_auth_httpx_timeouts.py
- _block_db_import
- fixture
- _FakeDb
- _Boom
- test_logout_csrf.py
- test_redis_cutover_doc_targeted_recreate.py
- format_navigation_context
- _authenticate
- 13014695175a_user_api_keys_and_account_audit_log.py
- 1f617e094d19_add_project_share_grants.py
- 945401a1e8c0_baseline_phase35.py
- a13cd5e70f24_change_set_applied_audit_fields.py
- a5b6c7d8e9f0_constrain_integration_registration_status.py
- a9b8c7d6e5f4_add_assistant_parameter_proposals.py
- b0c1d2e3f4a5_add_element_cache_origin_absent.py
- b1c2d3e4f5a6_move_is_draft_to_membership.py
- b5d234c2723e_add_firm_billing_timezone.py
- c1d2e3f4a5b6_add_writeback_and_wizard_audit_tables.py
- c4d5e6f7a8b9_add_execution_started_at.py
- c6d7e8f9a0b1_add_firm_onboarding_requests.py
- d1b7e2a9c4f0_add_assistant_parameter_proposals_project_id.py
- d5e6f7a8b9c0_add_model_versions_cached_at_index.py
- d5f8b3c62e49_change_set_approval_reason.py
- d8e9f0a1b2c3_add_client_budget_reservations.py
- e0f1a2b3c4d5_add_firm_allowed_hubs_and_project_hub_cache.py
- e3f4a5b6c7d8_add_qa_history_tables.py
- e6f7a8b9c0d1_add_phase3_8_acc_role_sync.py
- f13c5e70a0b1_add_change_set_tables.py
- f2b3c4d5e6f7_add_allowed_projects.py
- f4a5b6c7d8e9_add_integration_registration.py
- f7a8b9c0d1e2_add_is_firm_model_editor.py
- h8i9j0k1l2m3_add_firm_documents.py
- i9j0k1l2m3n4_add_share_snapshots.py
- j0k1permproj_add_permission_projection.py
- k1l2m3n4o5p6_add_authz_decision_log.py
- m3n4o5p6q7r8_add_published_artifacts.py
- o5p6q7r8s9t0_add_track2_content_grants.py
- p6q7r8s9t0u1_add_emergency_deny_scopes.py
- s1t2u3v4w5x6_add_phase5_persistence.py
- t0u1v2w3x4y5_drop_allowed_projects.py
- t2u3v4w5x6y7_add_provisioning_jobs.py
- u1v2w3x4y5z6_add_r5_filter_observations.py
- w5x6y7z8a9b0_add_assistant_conversations.py
- x6y7z8a9b0c1_add_assistant_digests.py
- test_policy_vocabulary_is_identical_in_code_model_and_migration
- test_reserve_turn_refuses_finalized_replay
- test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once
- test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes
- test_item_tip_failure_modes_are_the_uniform_404
- test_firm_router_never_touches_personal_key_accessor
- test_refresh_model.py
- kinds_without_config_contract
- prepare-firm-docs.sh
- test_a_run_that_proved_nothing_still_writes_an_honest_artifact
- test_live_duration_covers_the_model_calls_not_just_the_scoring
- test_admin_router_mounted_only_behind_admin_enabled_flag
- test_live_read_resume_reservation_429_restores_ticket_before_body_read
- parametrize
- test_with_reservation_settles_stream_error_and_stops_heartbeat
- test_assistant_readonly.py
- TestActionRegistry
- _Sentinel
- test_revert_on_role_gate_precedes_the_project_gate
- test_transient_upstream_failure_is_503_not_a_denial
- test_ledger_executor_is_fifo
- _empty_acc_tree
- ready
- entrypoint.sh
- repair-firm-docs-ownership.sh
- shared_parameters/__init__.py
- sim/__init__.py
- baseline
- test_degraded_fixture_fails_the_offline_gate
- test_degraded_expectation_fails_the_offline_gate
- test_grounding_cap_drift_fails_the_offline_gate
- test_a_pin_missing_from_the_baseline_is_reported_as_drift
- test_no_drift_against_the_checked_in_baseline
- test_write_baseline_cannot_move_a_threshold
- test_re_pinning_marks_the_live_evidence_stale
- test_live_ambiguous_cases_are_reported_not_scored
- test_live_summary_carries_repeats_but_offline_does_not
- test_offline_summary_keys_are_a_closed_set
- test_module_imports_without_anthropic
- test_baseline_declares_a_freshness_window_and_a_fresh_run_is_not_stale
- test_offline_sample_count_covers_every_check
- test_truncated_case_file_fails_even_with_a_healthy_fixture
- _clear_pending
- test_opus_5_builder_contract
- _FakeSession
- _sweep
- share_chain
- viewer
- test_revert_on_preview_write_flag_off_precedes_the_project_gate
- test_revert_on_preview_is_bound_to_the_proposals_project
- test_revert_on_execute_empty_stamp_is_fail_closed
- test_revert_off_legacy_null_row_is_unchanged
- test_revert_off_never_binds
- test_shared_project_hub_id_consistent_with_shared_projects
- test_shared_projects_carry_project_name_separate_from_label
- test_write_dependency_twins_are_write_gated
- test_each_dangerous_char_stripped
- _clean_rows
- _install_import_stubs
- test_usage_predicate_is_owner_personal_byok_only
- AccessLevel
- Firm
- get
- put
- Request
- WriteInstanceParameterRequest
- WriteInstanceParameterResponse
- BudgetStatus
- Counter
- CredentialSelection
- get
- RequestKind
- SavedView
- AccessLevel
- timedelta
- DataClassification
- DataClassification
- field_validator
- get
- Session
- MultiFernet
- Point2D
- TypedDict
- get
- DocPlacement
- get
- NamedDeliverable
- UserFirmMembership
- NamedTuple
- Session
- LookupError
- Request
- post
- SavedView
- Session
- Any
- Response
- get
- AsyncClient
- get
- Query
- Request
- Authorizer
- BackgroundTasks
- BaseException
- CompletedProcess
- DataClassification
- EditLog
- Event
- Exception
- FirmAllowedHub
- JSONResponse
- Lock
- FastAPI
- get
- ModelUrnResolver
- Namespace
- ProjectShareGrant
- ProvisioningJob
- ProxyResult
- PublishedArtifactView
- RedirectResponse
- RelationshipPrewarmJob
- ResourceRecord
- Response
- CheckSyncConflictsRequest
- CheckSyncConflictsResponse
- ListOpenDocumentsRequest
- ListOpenDocumentsResponse
- ReadCategoryRequest
- ReadCategoryResponse
- SyncWithCentralRequest
- SyncWithCentralResponse
- WriteInstanceParameterRequest
- WriteInstanceParameterResponse
- SdkResource
- Session
- get
- SourceAuthorizer
- str
- get
- NamedTuple
- NamedDeliverable
- CredentialSelection
- real_hub_tenancy
- parametrize
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- Path
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- UpstreamResponse
- ProjectSetupInput
- Request

## God Nodes (most connected - your core abstractions)
1. `Firm` - 324 edges
2. `generate_spec_draft()` - 255 edges
3. `UserFirmMembership` - 254 edges
4. `AccountAuditLog` - 183 edges
5. `FirmAllowedHub` - 169 edges
6. `ModelIndex` - 168 edges
7. `_el()` - 165 edges
8. `_ids()` - 160 edges
9. `ModelVersion` - 150 edges
10. `hash_id()` - 142 edges

## Surprising Connections (you probably didn't know these)
- `test_every_outcome_has_exactly_one_category()` --uses--> `DeliveryOutcome`  [INFERRED]
  tests/test_lifecycle_dispatch_pure.py → aec/integrations/lifecycle_messages.py
- `test_upload_rules()` --uses--> `AccessLevel`  [INFERRED]
  tests/test_firm_docs_policy_unit.py → aec/authz/effective_access.py
- `test_list_keeps_rows_when_firm_capability_enabled()` --uses--> `FirmAllowedHub`  [INFERRED]
  tests/test_change_set_hub_isolation.py → db/models.py
- `test_orm_declares_named_status_check_constraint()` --uses--> `IntegrationRegistration`  [INFERRED]
  tests/test_integrations_control_plane.py → db/models.py
- `_financial()` --uses--> `FirmDocument`  [INFERRED]
  tests/test_phase9_product_ingest_e2e.py → db/models.py

## Import Cycles
- None detected.

## Communities (894 total, 218 thin omitted)

### Community 0 - "main.py"
Cohesion: 0.01
Nodes (232): Admin authorization: verified Google identity + active admin_roles row. The…, get_digest_endpoint(), Phase 4d Lever 4: the latest proactive digest for a model. Generated lazily on…, Authorization-Inheritance package (plan v3). Greenfield home for the…, on_session_cleared(), Logout / dead-session hook for ``aps.auth.clear_user_session``: drops every…, get_schema(), get_type() (+224 more)

### Community 1 - "product_ingestion/extract.py"
Cohesion: 0.02
Nodes (195): DocumentTooLarge, EmptyDocument, EncryptedDocument, IngestionError, Exception, Ingestion error taxonomy (Phase 9 cutsheet ingestion). Every error carries a…, Base class: a source document could not be turned into page text., Corrupt, truncated, hostile or not-a-PDF bytes. (+187 more)

### Community 2 - "test_spec_generator.py"
Cohesion: 0.03
Nodes (219): generate_spec_draft(), Build a spec-section draft for a category from its element rows. Returns a…, _el(), _ids(), Wave 4.10 — Spec Draft Generation: rule-engine unit tests., test_access_control_card_reader_clause(), test_access_control_electric_strike_clause(), test_access_control_electric_strike_explicit_fail_mode_clears_flag() (+211 more)

### Community 3 - "assistant.py"
Cohesion: 0.02
Nodes (171): _assert_firm_capability_for_hub(), assistant_enabled(), assistant_models(), _authz_gate_model(), _autodesk_first_revert_gate(), chat(), ChatBody, ChatContext (+163 more)

### Community 4 - "test_model_policy.py"
Cohesion: 0.03
Nodes (174): Actor, allowed_model_ids(), budget_downgrade_target(), Candidate, classify_provider_error(), _default_candidate(), denial_counts(), FirmPolicy (+166 more)

### Community 5 - "aec/router.py"
Cohesion: 0.03
Nodes (168): Flag on: an optional ``project_id`` is mandatory (400), because the entitlement…, require_project_id(), _load_warm_category(), Data-Tab warm (2026-06-03) — warm-only probe for the non-blocking…, _apply_columns(), _apply_filters(), _assert_hub_matches_cache(), _authz_env_enforcing() (+160 more)

### Community 6 - "_el"
Cohesion: 0.03
Nodes (58): assemble_architectural_floor_assembly_schedule(), build_architectural_floor_assembly_rows(), Type-grain floor assembly schedule. One row per floor type with total area (sum…, assemble_fire_protection_alarm_device_schedule(), build_fire_protection_alarm_device_rows(), Type-grain fire alarm device schedule from Fire Alarm Devices category. One row…, assemble_fire_protection_fire_pump_schedule(), build_fire_protection_fire_pump_rows() (+50 more)

### Community 7 - "ModelIndex"
Cohesion: 0.03
Nodes (157): Soft-revoke every active cross-firm share on this project that this firm is a…, revoke_project_share_grants(), ModelIndex, PermissionProjection, Per-(principal, project, resource) effective-access projection — the persisted…, Search index for model discovery across projects (Phase 3.2.x). Populated…, _active_share_rows(), _clean_rows() (+149 more)

### Community 8 - "FirmDocument"
Cohesion: 0.04
Nodes (151): _require_enabled(), backfill_firm(), BackfillReport, _cap(), _chunks(), claim_next(), _decode_cursor(), document_hubs() (+143 more)

### Community 9 - "hub_tenancy.py"
Cohesion: 0.03
Nodes (131): assert_user_ceiling(), UUID, Flag off: no-op (``None``). Flag on: the Layer-1 verdict for this user,…, allowed_hubs_for(), assert_project_in_firm_hub(), assert_project_in_firm_hub_cached(), _audit_hub(), _audit_refused_write() (+123 more)

### Community 10 - "test_circuit_helpers.py"
Cohesion: 0.03
Nodes (137): _circuit_breaker_amps(), _circuit_first_int(), _circuit_load_va(), _circuit_poles(), _circuit_sort_key(), _device_description(), _float_from(), _format_apparent_power_va() (+129 more)

### Community 11 - "test_slack_router.py"
Cohesion: 0.03
Nodes (116): hmac, create_oauth_state(), Single-use by construction (store.pop). Returns {firm_id, installing_user_id}…, Mint a single-use CSRF state value for the Slack OAuth `state` param, bound to…, redeem_oauth_state(), test_oauth_state_is_single_use(), test_oauth_state_round_trip(), test_oauth_state_unknown_value_returns_none() (+108 more)

### Community 12 - "test_teams_router.py"
Cohesion: 0.04
Nodes (106): The conversation's binding (project + model), or None if unbound. Returns plain…, resolve_conversation_binding(), _activity(), _allow_project(), _async_none(), _deny_hub_factory(), _hub_allows(), _post() (+98 more)

### Community 13 - "RedisStore"
Cohesion: 0.02
Nodes (98): Cross-process async mutex on the redis backend. SET NX PX acquire, jittered…, redis_lock(), Configuration helpers for the shared-state store. (Wave C-1 Phase 0; canonical…, Return the Redis connection URL (default: 'redis://redis:6379/0')., redis_url(), LockTimeout, Exception, Exceptions for the shared-state subsystem. (Wave C-1 Phase 0) Re-exported from… (+90 more)

### Community 14 - "test_schedule_helpers.py"
Cohesion: 0.03
Nodes (123): assemble_lighting_fixture_schedule(), build_fixture_rows(), _lighting_voltage_summaries(), Lighting-fixture-schedule shaping (Wave 4.8). Pure-Python — no fastapi/DB/AEC-…, Fixture count + total connected load (W) per Voltage. Per-type watts is the SUM…, Top-level shaper: type-grain rows + totals. Caller pre-filters to Lighting…, Group Lighting Fixtures instances by Type Mark; one row per type. Type-level…, assemble_receptacle_schedule() (+115 more)

### Community 15 - "get_or_refresh_category"
Cohesion: 0.03
Nodes (106): get_or_refresh_category(), Returns (element_dicts, version_key) for the given category. Refreshes from AEC…, has_recent_verified_pairing(), key_pairing(), pairing_block_reason(), PairingVerificationError, Exception, Session (+98 more)

### Community 16 - "test_authz_share_authority.py"
Cohesion: 0.03
Nodes (110): _DB, _decide(), _DirtyDB, _HubCacheRow, _HubGrantRow, _own_reach_rows(), _PendingRollback, parametrize (+102 more)

### Community 17 - "client_keys.py"
Cohesion: 0.04
Nodes (117): _cipher(), decrypt_api_key(), encrypt_api_key(), _fernet_key_for(), get_api_key_for_firm(), get_api_key_for_user(), key_hint(), Session (+109 more)

### Community 18 - "proxy_sdk_resource"
Cohesion: 0.05
Nodes (113): _manifest_cache_key(), proxy_sdk_resource(), _cached_manifest(), ModelUrnResolver, Manifest cache key -- the SERVER-resolved model urn only. Never carries caller,…, Authorize -> resolve model -> bind resource -> fetch. Fail closed at every step…, ProjectModelLister, _b_manifest_fetches() (+105 more)

### Community 19 - "get_store"
Cohesion: 0.03
Nodes (98): binding_matches(), _block_to_jsonsafe(), _clean(), DocumentBinding, expected_binding_from_document(), _jsonsafe_state(), LiveReadElementIn, LiveReadErrorIn (+90 more)

### Community 20 - "UserRole"
Cohesion: 0.04
Nodes (106): active_editor_user_uuids(), assert_firm_keeps_an_editor(), Collection, Session, UUID, Last-editor guard — an ACTIVE firm must never be left with zero firm view…, The role uuids of the firm's ACTIVE members holding an explicit view-editor row., Lock the firm and raise 409 ``last_editor`` if removing editor authority from… (+98 more)

### Community 21 - "test_cross_firm_share_api.py"
Cohesion: 0.04
Nodes (108): Grantee-facing wire shape: what the grantee's UI needs to show 'Shared by…, shared_project_out(), _add_domain(), _admin_app(), as_admin(), _audits(), _aurl(), _deny_detail() (+100 more)

### Community 22 - "teams/router.py"
Cohesion: 0.04
Nodes (104): _build_client(), _generate_title(), _persist_turn(), Pass agent events through unchanged, but capture the final answer and (after…, One-shot background-model summary of the first user message into a short title.…, is_active_member_of_firm(), Session, UUID (+96 more)

### Community 23 - "autodesk_first.py"
Cohesion: 0.04
Nodes (101): Log and count one decision. ``started`` is a ``time.perf_counter()`` stamp…, record_decision(), _active_firm_for(), authorize_linked_user(), authorize_service_actor(), authorize_user_actor(), block_unclassified(), Decision (+93 more)

### Community 24 - "integrations/config.py"
Cohesion: 0.03
Nodes (93): _classify(), _classify_key_material(), ConfigVar, _declared(), integration_config_contract(), IntegrationConfigContract, _is_https_url(), _is_placeholder() (+85 more)

### Community 25 - "test_phase9_product_ingestion_governance.py"
Cohesion: 0.04
Nodes (96): Why the worker must not start, or None., startup_problem(), _accept(), _code_shaped(), _code_shaped_ci(), _dash_title(), _DocIndex, Evidence (+88 more)

### Community 26 - "proxy_router.py"
Cohesion: 0.04
Nodes (105): anyio, _authorize(), _correlation_id(), _gate(), _list_project_models(), _no_store(), proxy_derivative_asset(), _proxy_download_gate() (+97 more)

### Community 27 - "EnforcementMode"
Cohesion: 0.04
Nodes (105): EnforcementMode, How a derived-read decision is applied at a serving path. OFF — the gate is…, _call(), _FakeDb, Pure tests for the derived-read orchestrator (aec.authz.guard). Pure lane (no…, OFF is a zero-cost no-op and stays one: the telemetry must not give it a reason…, Clear the tombstone, the way the sync does when a lineage reappears., A row that exists and denies (stale/insufficient/failed-sync) stays… (+97 more)

### Community 28 - "product_review_service.py"
Cohesion: 0.05
Nodes (103): Pillar 2 — per-firm client document retrieval. Backend-owned vendored copy of…, ProductReviewView, ValueError, What a reviewer sees for one product. Core fields first, then by name., Build from a ``db.models.ProductRecord`` (duck-typed: pure, no session).…, The requested action is not allowed from the current state. Its message is…, ReviewAction, ReviewTransitionError (+95 more)

### Community 29 - "aps/router.py"
Cohesion: 0.04
Nodes (104): content_scope_cacheable(), May a content-cache key built from ``scope`` be STORED? (W5 P1F4 item 1) False…, {discipline_label: [{name,id}, ...]} for the project's RVTs, grouped by the…, suggest_pilots(), _assert_urn_in_project(), _verify(), _authed_get(), _authed_get_binary() (+96 more)

### Community 30 - "get_user_uuid"
Cohesion: 0.04
Nodes (97): _clear_firm_default_group(), create_group(), delete_group(), _get_active_group(), _group_defaults_jsonb(), _group_to_dict(), GroupCreateBody, GroupMember (+89 more)

### Community 31 - "ProductRecord"
Cohesion: 0.06
Nodes (93): ingest_bytes(), IngestionResult, Exactly one of (``document`` + ``candidate``) or ``error_code`` is set., Parse + extract one document. Never raises ``IngestionError``., Persist a successful ``IngestionResult`` with its full run provenance (option…, Flag an existing product whose source failed to re-ingest. Stores the typed…, record_ingestion_failure(), store_ingestion_result() (+85 more)

### Community 32 - "RevitLinkError"
Cohesion: 0.04
Nodes (76): MintSyncTokenRequest, audit_sync_rejection(), P7-SYNC-REJECTION-AUDIT: record a typed sync-token rejection (replay, expiry,…, Any, Enum, Exception, str, RevitLinkError (+68 more)

### Community 33 - "assert_project_access"
Cohesion: 0.06
Nodes (93): assert_project_access(), The authoritative, fail-closed project-access decision (one function, every…, _allows(), _audit_db_error(), _audit_rows(), _denies(), flag_off(), flag_on() (+85 more)

### Community 34 - "test_acc_role_sync.py"
Cohesion: 0.05
Nodes (92): AccRoleSyncError, _admin_project_id(), _extract_role(), fetch_project_members(), _first_present(), _next_offset(), Any, RuntimeError (+84 more)

### Community 35 - "test_panel_schedule.py"
Cohesion: 0.04
Nodes (96): assemble_panel_schedule(), build_circuits(), _compose_vpw(), compute_totals(), extract_load_type_breakdown(), extract_panel_header(), _format_voltage_v(), _pad_spare_slots() (+88 more)

### Community 36 - "test_firm_onboarding.py"
Cohesion: 0.06
Nodes (94): _apply_challenge(), _audit(), get_open_request(), _now(), onboarding_enabled(), OnboardingConflict, OnboardingDisabled, OnboardingInvalid (+86 more)

### Community 37 - "UserFirmMembership"
Cohesion: 0.04
Nodes (79): create_user_session(), Create a server-side session and return its session id (sid). Called once from…, Principal, One canonical BIMpossible principal per human (plan §1). External identities…, UserFirmMembership, Relay-defer tripwire (2026-08-06 — see PARKED.md, "Relay routing — deliberately…, revit_link_enabled(), warn_if_multi_firm_single_relay() (+71 more)

### Community 38 - "ModelVersion"
Cohesion: 0.05
Nodes (87): assemble_and_resolve(), invalidate_room_pool(), _load_room_pool(), Drop cached room pools for a project. Called by the warm writer after it…, Assemble (rooms, level_elevation_by_name, current_phase) from the arch models'…, Reads the warm-time cache tables for `project_id` and resolves each of…, ensure_category_origins_warm(), Session (+79 more)

### Community 39 - "EntitlementCache"
Cohesion: 0.05
Nodes (74): entitlement_key(), EntitlementCache, get_default_cache(), on_aps_refusal(), on_session_removed(), Layer 1 — per-user Autodesk project entitlement snapshot cache (Option B, PR…, Build the key from a live token; the token itself is hashed here and discarded., Bounded, thread-safe, in-process store of positive per-user project… (+66 more)

### Community 40 - "RelationshipPrewarmJob"
Cohesion: 0.05
Nodes (87): claim_next(), has_done_job(), has_failed_job(), job_is_running(), mark_done(), mark_failed(), Session, OD2 Phase 4 — relationship pre-warm queue primitives. A durable Postgres job… (+79 more)

### Community 41 - "FirmAllowedHub"
Cohesion: 0.06
Nodes (80): _audit(), enroll_project(), is_enrolled(), list_enrollments(), _locked_hub_grant(), Session, UUID, Per-firm project enrollment — the write side of firm_allowed_projects. A hub… (+72 more)

### Community 42 - "AsyncTTLCache"
Cohesion: 0.04
Nodes (78): Backward-compatibility shim. `AsyncTTLCache` moved to the neutral…, K, _counting_compute(), _populate(), F-4: bounded LRU eviction for AsyncTTLCache. The shared TTL-cache primitive…, max_entries defaults to None → no eviction (existing callers unchanged)., N-17: invalidate() must drop the per-key lock alongside the entry, the same…, Seed `cache` with one entry + per-key lock per key (sync, no event loop needed). (+70 more)

### Community 43 - "account_router.py"
Cohesion: 0.06
Nodes (90): account_add_hub(), account_api_key(), account_available_projects(), _compute(), account_budget(), account_create_project_share(), account_discover_hubs(), account_enroll_project() (+82 more)

### Community 44 - "test_autodesk_first_cache_tier.py"
Cohesion: 0.06
Nodes (76): discovery_cache(), entitlement_cache(), invalidate_user_access(), Redis iff the canonical shared-state selector resolves to ``redis`` (W5 CFG-B).…, Drop every entitlement AND discovery entry of one user (all tokens). ``cache``…, Test seam: empty the in-process tiers and every Redis tier this process opened., reset_access_caches(), selected_backend() (+68 more)

### Community 45 - "test_shared_parameters_registry.py"
Cohesion: 0.05
Nodes (73): The registry's enrichment map with the registry key attached to each row.…, registry_seed_rows(), _assert_roundtrip(), build_seed(), derive_guid(), find_orphaned_keys(), generate(), load_lock() (+65 more)

### Community 46 - "db/models.py"
Cohesion: 0.03
Nodes (77): get_for_version(), get_latest(), Phase 4d Lever 4 — persistence for per-model digests…, The stored digest JSONB for one model version, or None if not generated yet., The most recently generated digest for a model (any version), or None. Used by…, Insert the digest for a version, or replace it if one already exists. ON…, upsert(), Per-project QA rule overrides (Phase 11) — DB layer. `load_overrides` reads a… (+69 more)

### Community 47 - "admin_router.py"
Cohesion: 0.06
Nodes (87): add_domain(), AddDomainBody, admin_create_project_share(), admin_grant_hub(), admin_list_hubs(), admin_list_integrations(), admin_list_project_shares(), admin_patch_hub() (+79 more)

### Community 48 - "_scenario_harness.py"
Cohesion: 0.04
Nodes (67): actions(), as_user(), audit_rows(), build_app(), client(), domain_login(), GoogleTokens, grants() (+59 more)

### Community 49 - "access_cache.py"
Cohesion: 0.05
Nodes (52): alookup(), aon_aps_refusal(), arecord(), _BreakerOpen, content_generation_token(), discovery_generation_key(), discovery_ttl_seconds(), entitlement_redis_key() (+44 more)

### Community 50 - "graph_analysis.py"
Cohesion: 0.05
Nodes (81): analyze_electrical_topology(), analyze_mep_topology(), _anchor_component(), build_circuit_graph(), collect_topology(), _critical_g(), critical_panels(), _feeder_loops_g() (+73 more)

### Community 51 - "record_decision"
Cohesion: 0.06
Nodes (69): disable_batching(), dropped_count(), enable_batching(), _enqueue(), flush_pending(), _flush_row_by_row(), pending_count(), Any (+61 more)

### Community 52 - "test_phase9_product_ingest_e2e.py"
Cohesion: 0.04
Nodes (70): One sweeper pass: expired leases recovered, released duplicate matches re-…, sweep_stale_jobs(), _as_project_doc(), _crossed_keys(), _cutsheet(), _drain(), _financial(), _keyed_pair() (+62 more)

### Community 53 - "track2_content_router.py"
Cohesion: 0.04
Nodes (78): _http_error_for(), HTTPException, post, UUID, Phase 3.8 slice 3 — POST /data/acc/sync-roles. Firm-admin-triggered, read-only-…, Map a typed sync failure to an admin-facing status. A 403 from Autodesk means…, Refresh acc_company_id / acc_company_name / acc_role on this firm's active…, sync_acc_roles() (+70 more)

### Community 54 - "cache_reconcile.py"
Cohesion: 0.05
Nodes (73): _apply_transition(), build_delete_plan(), _distinct_cached_projects(), _est_element_bytes(), _fail_threshold(), _flag(), format_report(), _get_or_make_state() (+65 more)

### Community 55 - "test_slack_pairing_db.py"
Cohesion: 0.05
Nodes (75): Slack Assistant Gateway (external chat-app gateway): one Slack workspace bound…, One (workspace, Slack user) -> exactly one BIMpossible user, set via the…, One (workspace, channel) -> one BIMpossible project AND one model. Not in the…, SlackChannelBinding, SlackUserBinding, SlackWorkspaceBinding, bind_channel(), ChannelBinding (+67 more)

### Community 56 - "_client"
Cohesion: 0.05
Nodes (34): _client(), CreateFolderTests, handler(), handler(), handler(), CreateProjectTests, handler(), handler() (+26 more)

### Community 57 - "acceptance.py"
Cohesion: 0.05
Nodes (66): Evidence, Grade, grade_fault_closed(), grade_logscan_hits(), grade_not_graded_designed_mix(), grade_redis_steps(), grade_revoke_seconds(), grade_rollback_step() (+58 more)

### Community 58 - "build_equipment_rows"
Cohesion: 0.06
Nodes (73): assemble_distribution_board_schedule(), assemble_electrical_equipment_schedule(), assemble_switchboard_schedule(), build_equipment_rows(), _family_contains(), _fmt_va_blank0(), _mains(), _phase_va() (+65 more)

### Community 59 - "UsageEvent"
Cohesion: 0.05
Nodes (60): Persist one usage row. Runs as a background task — never raises., record_usage(), ModelDenialEvent, One row per Claude API call (per tool-use turn) from the assistant. Token…, Model routing slice 1B: durable form of the resolver's denial counters. A…, UsageEvent, firm(), owner() (+52 more)

### Community 60 - "test_emergency_deny.py"
Cohesion: 0.06
Nodes (65): EmergencyDenial, is_active(), match_emergency_denial(), _norm(), datetime, Break-glass emergency deny — the manual "Revoke access now" kill switch (plan…, A pure, immutable view of one stored emergency-deny row.…, Normalize an identity to a comparable string (UUIDs, ints, etc. all compare as… (+57 more)

### Community 61 - "aec/client.py"
Cohesion: 0.05
Nodes (69): _compute(), Cache layer: AEC Data Model API → PostgreSQL. get_or_refresh_category() is the…, fetch_element_specs(), fetch_elements_by_category(), _get_http_client(), _gql(), invalidate_tip_cache(), list_categories() (+61 more)

### Community 62 - "personal_assistant.py"
Cohesion: 0.06
Nodes (70): personal_keys_enabled(), Slice 4: the user's OWN key for the isolated personal workspace. Reads ONLY…, Whether the personal-key tier is offered at all (B-2; ratified D-3 gives admins…, resolve_personal_credential(), get_entry(), _audit(), _context_response(), _credential_status() (+62 more)

### Community 63 - "test_usage_ledger_1b.py"
Cohesion: 0.08
Nodes (63): ModelPricing, USD per million tokens. `pricing_version` dates the numbers (anchor C-2)., buckets_from_usage(), estimate_cost_usd(), prices_from_pricing(), Decimal, Model routing slice 1B — the estimated-cost rule (pure; no DB, no SDK).…, The Anthropic disjoint quartet (see usage_logger module docstring). (+55 more)

### Community 64 - "product_records.py"
Cohesion: 0.05
Nodes (65): IntegrityError, True when ``exc`` is the named constraint's violation. psycopg2 exposes the…, _violates_constraint(), _accepted_identity(), _apply_run(), _blank_to_none(), _check_source_document(), _content() (+57 more)

### Community 65 - "test_authz_share_optin_boundary.py"
Cohesion: 0.04
Nodes (63): _backend_source(), _callers_of(), _enclosing_def(), _enclosing_function(), _gate_calls(), _guard(), _keyword_or_positional(), _NoRows (+55 more)

### Community 66 - "test_help_library.py"
Cohesion: 0.03
Nodes (25): Phase 3.2' must stay one token - splitting it makes every phase query wrong., `write-back` must be reachable by someone who types `writeback`., roll back' must reach a doc that only ever writes 'Rollback'., do it' -> 'doit' is noise, not a compound., Two docs with byte-identical title/keywords/body (raw BM25 ties exactly):…, Zero token overlap with any real doc - distinct from a query that legitimately…, Used to claim a separate 'Schedules tab' and a render-mode switcher; the…, Schedules' used to be listed as its own tab; it's a Data-tab feature, not a tab. (+17 more)

### Community 67 - "test_membership_draft_gating.py"
Cohesion: 0.06
Nodes (66): Event, Alert-state refresh background worker (AST-M4, 2026-07-10 audit). aec/alerts.py…, Recompute + upsert firm_alert_state for every firm. Best-effort per firm., _refresh_loop(), _refresh_once(), start(), _alert(), compute_alerts() (+58 more)

### Community 68 - "identity_router.py"
Cohesion: 0.07
Nodes (72): identity_link_state_secret(), HMAC key for identity-link OAuth states. Empty when unset — the caller MUST…, LinkStateClaims, LinkStateRefusal, Enum, str, Why a state was not honoured. Every one of these means DENY — none mean 'try…, The binding a valid state proves. Timestamps are epoch seconds (UTC). (+64 more)

### Community 69 - "test_model_resolve.py"
Cohesion: 0.05
Nodes (59): EffectiveProjectAccess, HubAccess, One granted hub. project_ids is None for all_projects (every project in the…, A firm's full (hub → HubAccess) map. Empty map = no access at all — the default…, guids_match(), normalize_guid(), order_projects_hint_first(), Phase 15 Wave A2.1 -- pure helpers for reverse cloud-model resolution. The… (+51 more)

### Community 70 - "Firm"
Cohesion: 0.05
Nodes (65): AccountAuditLog, Firm, FirmAlertDismissal, Append-only audit trail for credential and role changes (B-3, migration…, Barrier, fixture, UUID, W5 ROLES — concurrent client-admin revokes cannot leave a firm with zero client… (+57 more)

### Community 71 - "test_qa_engine.py"
Cohesion: 0.08
Nodes (72): apply_overrides(), Run `rules` over `elements`; return a model-health report (see module…, Return a list of config problems with `rule` (empty list = valid). Call at the…, Apply per-scope rule overrides to `rules`, returning a NEW list. `overrides`…, run_checks(), validate_rule(), list_rules(), Run the QA rules over a model's elements and return a health report.… (+64 more)

### Community 72 - "test_autodesk_first_aps_share.py"
Cohesion: 0.08
Nodes (68): _as_user(), _flag(), _grant_c(), _never(), _no_leak(), _proxy_routes(), parametrize, Option B / B4 part b + B5 (W4 D2b): the Autodesk-first ceiling on APS / proxy… (+60 more)

### Community 73 - "test_change_set_service.py"
Cohesion: 0.05
Nodes (67): ChangeSetError, ChangeSetValidationError, InvalidChangeSetTransition, is_revit_unique_id(), next_status(), outcome_is_drift(), Exception, aec/change_set.py — Change Set service (Phase 13, Domain A Stage 1). PURE… (+59 more)

### Community 74 - "test_model_budget_rollup.py"
Cohesion: 0.06
Nodes (58): firm_billing_context(), load_budget(), load_budget_or_degraded(), platform_spend(), datetime, Decimal, UUID, Platform budget accounting — slice 3, DB layer. Rolls the slice-1B… (+50 more)

### Community 75 - "WriteApproval"
Cohesion: 0.05
Nodes (36): _approval(), An open approval scoped to CREATE_DETAILS' hub — what the router issues once…, _approval(), ApprovalRecordTests, _client(), ClientGateTests, _Clock, ConsentClampTests (+28 more)

### Community 76 - "test_model_budget.py"
Cohesion: 0.05
Nodes (68): month_window(), datetime, The calendar month containing `now`, in `tz_name`, as a UTC window., budget_downgrade_notice(), Plain-text one-liner announcing that THIS turn was moved to a cheaper model, or…, _budget(), _exhausted(), parametrize (+60 more)

### Community 77 - "test_production_readiness_preflight.py"
Cohesion: 0.06
Nodes (66): Finding, PreflightResult, apply_flag_aliases(), main(), Options, parse_env_file(), planned_checks(), Path (+58 more)

### Community 78 - "AecUpstreamError"
Cohesion: 0.05
Nodes (60): _compute(), _probe_element_group_at_tip(), Kick one background upstream tip probe for (file_urn, project_id). No-op while…, Uncached remote probe. Raises AecUpstreamError (RuntimeError subclass) on any…, _schedule_tip_revalidation(), _done(), _revalidate(), AecErrorKind (+52 more)

### Community 79 - "test_relationships.py"
Cohesion: 0.07
Nodes (67): bfs_graph(), build_all_panel_circuit_edges(), build_panel_index(), _device_panel_ref(), _emit_host_edge(), _emit_level_edge(), _emit_panel_circuit_edges(), _emit_system_edges() (+59 more)

### Community 80 - "test_w9b_followup.py"
Cohesion: 0.05
Nodes (45): reset_single_flight(), Test seam: every access-cache tier (entitlements + discovery, memory + Redis)., reset_discovery_caches(), L(), _memory_tier(), fixture, _Aps, _events() (+37 more)

### Community 81 - "check_firm_view_editor"
Cohesion: 0.06
Nodes (39): check_firm_model_editor(), check_firm_view_editor(), _dynamic_firm_id(), grant_firm_model_editor(), grant_firm_view_editor(), is_firm_model_editor_open(), is_firm_view_editor(), UUID (+31 more)

### Community 82 - "assistant_tools.py"
Cohesion: 0.06
Nodes (61): _compact_health(), _compact_relationship_summary(), _compact_topology(), _electrical_circuit_edges(), _is_filled(), _load_category(), _load_relationship_pool(), _observe_filter() (+53 more)

### Community 83 - "_check_once"
Cohesion: 0.04
Nodes (58): True when background cache-fill workers use the Service-Account identity…, service_prewarm_active(), begin_verification_scope(), end_verification_scope(), Token, Start an EMPTY Layer-1 proof set for one unit of background work (W4 sec-fix…, Restore the proof set that was current before ``begin_verification_scope``., _filter_visible_arch_models() (+50 more)

### Community 84 - "test_authz_principals_repo.py"
Cohesion: 0.07
Nodes (63): active_admin_principal_ids(), attach_verified_autodesk_identity(), _bound_principal_id(), build_admin_scope(), grant_admin_scope(), link_identity(), list_admin_scopes(), load_admin_scope() (+55 more)

### Community 85 - "test_integrations_config.py"
Cohesion: 0.07
Nodes (62): check_integration_config(), Classify every variable in `kind`'s contract. Pure: no logging, no I/O beyond…, _adapter_package_files(), _adapter_sources(), _codes(), _is_loader_module(), _package_env_offences(), parametrize (+54 more)

### Community 86 - "test_spatial_relationships.py"
Cohesion: 0.07
Nodes (64): bbox_hit(), Classification, classify_point_among_regions(), distance_to_footprint(), footprint_bbox(), _has_usable_loop(), level_bands(), nearest_band() (+56 more)

### Community 87 - "sdk_proxy.py"
Cohesion: 0.05
Nodes (54): ProxyResult, What the router turns into an HTTP response. ``served`` is False for an…, authorized_same_project_texture_root(), _bad_gateway(), _close(), _deny(), _normalize(), Any (+46 more)

### Community 88 - "test_pdp_g1_sdk_proxy_core.py"
Cohesion: 0.07
Nodes (59): binding_from_manifest(), bound(), InvalidSdkPath, is_shared_texture_candidate(), ModelBinding, parse_cdn(), parse_file_segment(), parse_manifest_urn() (+51 more)

### Community 89 - "_clear_flags"
Cohesion: 0.09
Nodes (21): _body(), _clear_flags(), _clear_revit_link_cache(), _fail_if_called(), _fresh_router(), parametrize, Phase 7 step-2 — Revit Link SyncWithCentral re-enable guard tests. Companion to…, THE seam invariant: a denied caller must never even construct an engine. (+13 more)

### Community 90 - "schema_persist.py"
Cohesion: 0.06
Nodes (61): invalidate_all(), Session, GA-H2 (2026-06-09 audit) — delete superseded ModelVersion rows for one model.…, Single chokepoint for version-bound cache invalidation on a user Refresh (the…, sweep_superseded_versions(), evict_relationships_for_model(), Drop every resident assembled-pool entry for one (project_id, model_urn),…, _best_effort_write() (+53 more)

### Community 91 - "ProjectHubCache"
Cohesion: 0.06
Nodes (62): _aps_project_in_hub(), Ask APS whether the project lives in this hub. Errors mean 'no'. Any 401 from…, Resolve project→hub: cache first, else probe the candidate hubs. Only ever…, resolve_project_hub(), _get(), get_issue(), _headers(), IssuesUpstreamError (+54 more)

### Community 92 - "test_nl_filter_routing.py"
Cohesion: 0.05
Nodes (52): ModelCapabilities, ModelEntry, Enum, str, Compiled model registry — slice 1A of AI model routing. Single source of truth…, Structural invariants of the compiled registry. Returns a list of problems…, What the caller is asking the model to do. Drives kind-compat + defaults., RequestKind (+44 more)

### Community 93 - "native_adapter.py"
Cohesion: 0.10
Nodes (43): NotImplementedError, CheckedOutItem, CheckSyncConflictsRequest, CheckSyncConflictsResponse, DocumentInfo, ElementRow, ErrorResponse, ListOpenDocumentsRequest (+35 more)

### Community 94 - "_mock_db"
Cohesion: 0.11
Nodes (21): create_saved_view(), Create a new saved view. Returns the created view dict or raises on failure., Set a firm view as the firm default. Caller must be firm_view_editor., set_default_view(), IntegrityError, _apply_patches(), _mock_db(), _patch_identity() (+13 more)

### Community 95 - "test_firm_docs_unit.py"
Cohesion: 0.06
Nodes (57): extract_text(), Extract `data` (an allowlisted upload) to markdown-ish text. Raises…, load_or_rebuild(), The firm's index, rebuilt from text/ if missing, corrupt, wrong-version, or…, BM25 over the loaded index payload, best first. Empty query/corpus -> []., rebuild_and_save(), search(), SearchResult (+49 more)

### Community 96 - "assistant_parameter_writes.py"
Cohesion: 0.06
Nodes (61): amend_proposal(), assistant_revit_write_enabled(), AssistantWriteAuditEvent, _emit(), ErrorClass, execute_proposal(), ExecutionOutcome, _handle_execution_error() (+53 more)

### Community 97 - "change_set_router.py"
Cohesion: 0.08
Nodes (62): apply_change_set(), _approval_history_reason(), approve_change_set(), ApproveBody, _assert_family_type_in_model(), _assert_read_hub(), _authorized_read(), create_change_set() (+54 more)

### Community 98 - "product_ingest_worker.py"
Cohesion: 0.05
Nodes (55): ClaimedJob, JobError, JobStatus, StrEnum, Stored ``error_code`` values beyond the parser taxonomy (which is stored…, A detached snapshot of a claimed job: the worker holds no session across work., _context(), _dumps() (+47 more)

### Community 99 - "test_admin_router.py"
Cohesion: 0.07
Nodes (60): _fresh(), fixture, W7.1a — GET /admin/authz/autodesk-first-telemetry: admin-gated, dark unless…, test_dark_by_default_returns_404(), test_enabled_returns_snapshot_with_pid(), test_requires_admin_even_when_enabled(), _admin_secret_env(), _canned_shadow_observation() (+52 more)

### Community 100 - "test_enrichment_mapping.py"
Cohesion: 0.08
Nodes (53): ClearbitBackend, _default_backend(), enrich_firm(), EnrichmentBackend, EnrichmentResult, ManualBackend, Protocol, Provider-agnostic company enrichment. enrich_firm(domain, backend) ->… (+45 more)

### Community 101 - "test_phase9_product_ingest_worker.py"
Cohesion: 0.08
Nodes (51): process_next(), Claim and run one job. False when nothing was claimable., worker(), _job(), _jobs_of(), _pdf(), _products(), fixture (+43 more)

### Community 102 - "derivative_proxy.py"
Cohesion: 0.06
Nodes (57): _build_upstream_url(), DerivativeUpstream, InvalidDerivativeUrn, proxy_derivative(), proxy_enabled(), proxy_mode(), ProxyDisabledError, Any (+49 more)

### Community 103 - "test_context_search.py"
Cohesion: 0.06
Nodes (59): assemble_panel_context(), _context_counts(), _device_counts(), display_panel_name(), _fed_from(), group_panels_by_logical_name(), _is_marker(), match_panels() (+51 more)

### Community 104 - "spec_generator.py"
Cohesion: 0.05
Nodes (61): canonical_for_element(), _clause_included(), _condition_passes(), _distinct_values(), _efficacy_analysis(), _element_satisfies(), _infer_from_name(), library_for_category() (+53 more)

### Community 105 - "test_change_set_router.py"
Cohesion: 0.14
Nodes (61): _approved_two_edit_set(), _as_user(), _cleanup(), _create_draft(), _drop_batch(), _edit_log_rows(), _firm(), _member() (+53 more)

### Community 106 - "test_phase9_product_ingestion_extract.py"
Cohesion: 0.06
Nodes (59): _f(), _model(), parametrize, Phase 9 extraction profile — spike 0.3.2 tests ported to text input. Ports…, _run(), test_accepted_model_carries_evidence_and_rule(), test_accessory_table_codes_do_not_become_model(), test_article_number_label() (+51 more)

### Community 107 - "assemble_architectural_sheet_list_schedule"
Cohesion: 0.08
Nodes (21): _as_bool(), assemble_architectural_sheet_list_schedule(), _classify_kind(), _kind_order(), _parse_sheet_name(), Architectural sheet list schedule (Wave 10). Python port of…, Mirror parse.ts::classifyKind — sheet / legend / schedule / view., Return (number, title). Mirrors parse.ts::parseSheetName. (+13 more)

### Community 108 - "test_artifact_producer.py"
Cohesion: 0.07
Nodes (50): _build_index_summary(), canonical_payload_hash(), capture_manual_attestation_draft(), generate_model_derived_draft(), Any, UUID, Trusted producers for Track-2 published-artifact provenance (AUTH-INH Phase 5…, Server-generate a model-derived draft and stage it. The payload is computed… (+42 more)

### Community 109 - "test_authz_principal.py"
Cohesion: 0.07
Nodes (54): admin_can_act(), AdminAction, AuthProof, can_remove_admin(), CanonicalPrincipal, evaluate_link(), ExternalIdentity, governing_track() (+46 more)

### Community 110 - "authz_request_scope"
Cohesion: 0.07
Nodes (56): authz_request_scope(), memoize(), on_scope_close(), Any, Request-scoped memo for authorization lookups that must NOT be process-cached.…, Run ``fn`` when the current request scope unwinds. No scope bound ⇒ silently…, True when a request scope is open (used by tests to prove the memo is actually…, Return ``compute()``, served from the request memo when this ``key`` was… (+48 more)

### Community 111 - "test_live_filter.py"
Cohesion: 0.06
Nodes (44): MemoryStore, In-process implementation of SharedStore. Preserves today's single-process…, _make_redis_store(), fixture, Contract test suite for SharedStore — run identically against MemoryStore and…, A second acquirer blocks while the first holds the lock., A Redis lock with a short TTL auto-expires so a crashed holder doesn't deadlock…, Return a RedisStore connected to REDIS_URL, or None if unavailable. (+36 more)

### Community 112 - "test_phase1_safety.py"
Cohesion: 0.05
Nodes (30): _clear_revit_link_cache(), _find_names(), _parse_source(), fixture, Module, parametrize, Path, Phase 1 safety regression tests. Validates: 1. native_adapter._relay_secret()… (+22 more)

### Community 113 - "test_authz_acl_source.py"
Cohesion: 0.08
Nodes (50): AclSourceNotValidated, ApsAclSource, authz_seed_enabled(), _HttpGetJson, HubNotAllowedForFirm, normalize_snapshot(), parse_folder_contents(), parse_folder_permissions() (+42 more)

### Community 114 - "DataClassification"
Cohesion: 0.06
Nodes (48): DataClassification, The sensitivity class the admin assigns per artifact — the finer switch that…, create_grant(), get_grant(), list_candidate_grants_for_read(), list_firm_grants(), _norm(), Any (+40 more)

### Community 115 - "teams/pairing.py"
Cohesion: 0.05
Nodes (57): GatewayMembershipDenied, Exception, Raised by a pairing redeem when the code's BIMpossible user is not an active…, Microsoft Teams Assistant Gateway (external chat-app gateway): one Entra tenant…, One (tenant, Teams user) -> exactly one BIMpossible user, set via the single-…, TeamsTenantBinding, TeamsUserBinding, Mint a single-use pairing code for an authenticated BIMpossible web user to… (+49 more)

### Community 116 - "test_prewarm_worker.py"
Cohesion: 0.08
Nodes (40): process_next(), Claim and process one pending job. Returns True if a job was handled (so the…, _async(), _cleanup(), _enqueue(), _only_job_id(), _p9_setup(), fixture (+32 more)

### Community 117 - "test_phase9_element_product_bindings.py"
Cohesion: 0.10
Nodes (58): The human decision on a binding. proposed→confirmed/rejected and back are all…, set_binding_status(), _bind(), _by_type(), _count(), _fabricated_integrity_error(), _flag_on(), _product() (+50 more)

### Community 118 - "test_membership_lifecycle_cascade.py"
Cohesion: 0.08
Nodes (54): FirmDocumentCapability, PrincipalAdminScope, CKA-owned explicit elevated capability grant (migration b7c8d9e0f1a2):…, Client-admin delegation, explicit-scope (plan §7a.9). A dedicated side table…, admin_client(), _assert_bystanders_untouched(), _assert_target_cascaded_in_a(), _audits() (+46 more)

### Community 119 - "make_leaf"
Cohesion: 0.06
Nodes (55): cleanup(), db(), _hub_tenancy_default_allow(), make_leaf(), _factory(), _pairing_default_verified(), fixture, Yield a list of IDs; hard-delete those rows + any TEST_NAME_PREFIX leftovers on… (+47 more)

### Community 120 - "admin_delegation_router.py"
Cohesion: 0.06
Nodes (54): _relock(), _audit(), grant_client_admin(), _GrantBody, _is_active_member_principal(), list_client_admins(), _live_scope_state(), _projects_reach_firm_hubs() (+46 more)

### Community 121 - "cli_gate"
Cohesion: 0.06
Nodes (53): add_cli_actor_arguments(), cli_gate(), ArgumentParser, Namespace, Add ``--actor`` and ``--reason``. Both are optional, so flag-OFF invocations…, Gate an operator-run entry point. Returns None to proceed, or an exit code…, MemberFact, ProjectResources (+45 more)

### Community 122 - "ProjectShareGrant"
Cohesion: 0.08
Nodes (58): active_share_for(), _audit(), audit_cross_firm_access(), audit_share_denied(), eligible_recipient_firms(), _firm_exists(), _firm_is_active(), grant_project_share() (+50 more)

### Community 123 - "EngineKind"
Cohesion: 0.05
Nodes (41): _audit_sync(), EngineKind, execute_parameter_write(), execute_sync(), _gate(), get_engine(), CheckSyncConflictsRequest, CheckSyncConflictsResponse (+33 more)

### Community 124 - "env_flag"
Cohesion: 0.06
Nodes (50): _mounted(), _paths(), parametrize, Wave 3 (O7): the break-glass emergency-deny flag mounts its admin router…, test_mount_matches_serving_path_arming(), parametrize, Truth table for the canonical boolean env-flag resolver (Wave 5 CFG-A, owner-…, test_absent_uses_default() (+42 more)

### Community 125 - "hash_id"
Cohesion: 0.08
Nodes (43): emergency_deny_active(), True when the break-glass emergency-deny lookup should run on the serving path…, hash_id(), hash_salt(), The optional per-deployment HMAC key (W9-INV-131): ``None`` when unset or blank., Prefix of ``str(value)``'s digest; ``None`` stays ``None`` (field absent, not…, _default_session_factory(), explain() (+35 more)

### Community 126 - "membership.py"
Cohesion: 0.07
Nodes (53): ordered_for_update(), Query, ``query`` locked ``FOR UPDATE`` in the given primary-key order (levels 2 and…, assert_not_last_admin(), _bootstrap_admin_if_first(), _domain_of(), get_active_firm_id(), link_user_on_login() (+45 more)

### Community 127 - "Rule"
Cohesion: 0.07
Nodes (50): _applies(), _blank(), _compiled(), evaluate_predicate(), _expected(), _finding(), _norm(), _num() (+42 more)

### Community 128 - "ResourceRecord"
Cohesion: 0.10
Nodes (23): CustomClientErrorTypeTests, EmptyLedgerTests, _full_ledger(), PartialFailureTests, ProtocolAndDataclassTests, Pure-lane tests for the Phase 8 provisioning rollback walker (§10). Dedicated…, rollback catches any Exception and records type(exc).__name__: str(exc)., ResultOkPropertyTests (+15 more)

### Community 129 - "test_assistant_parameter_writes.py"
Cohesion: 0.06
Nodes (49): classify_error(), EscalationTracker, Classify a RevitLinkErrorCode into row / systemic / escalating. Every code…, Decides whether a given error occurrence should halt a sequence. Pure policy,…, Record one outcome (an error code, or None for success) and return whether THIS…, RevitLinkErrorCode, _default_write_flag_on(), _proposal_row() (+41 more)

### Community 130 - "_normalize_element"
Cohesion: 0.07
Nodes (47): _build_type_lookup(), _build_type_uid_lookup(), _infer_level_from_host(), _is_type_element(), _normalize_element(), Pure AEC element normalization — no DB, no SQLAlchemy. Split out of…, Build { (family_name, type_name): ElementType.UniqueId } from raw type element…, Convert a raw AEC DM element into a stable BIMpossible dict. Identity comes… (+39 more)

### Community 131 - "test_change_set_lifecycle_events.py"
Cohesion: 0.09
Nodes (52): claim_pending_events(), _claimed_row(), LifecycleEventError, mark_dispatched(), datetime, ValueError, aec/change_set_events.py — Change Set lifecycle outbox (Phase 13 event…, Claim up to ``limit`` of ``firm_id``'s events in cursor (id) order: every… (+44 more)

### Community 132 - "test_lifecycle_dispatch.py"
Cohesion: 0.14
Nodes (44): DispatchPolicy, DeliveryOutcome, Per-(event, provider) outcome. Values are stable machine codes., _as_user(), _cleanup(), _events(), _firm(), firm_user() (+36 more)

### Community 133 - "test_teams_pairing_db.py"
Cohesion: 0.06
Nodes (53): One (tenant, conversation) -> one BIMpossible project AND one model. The Teams…, TeamsConversationBinding, _membership_cleanup(), model_index_cleanup(), A user who really is (or isn't) a member of `firm_id` -> its derived UUID.…, Track ModelIndex project_ids to hard-delete on teardown. Test project ids are…, #291: scoped by `source` so a seeded row never leaks between tests., cleanup() (+45 more)

### Community 134 - "test_view_render_mode.py"
Cohesion: 0.07
Nodes (54): _create_url(), _list_url(), Wave 4 Session 3 — renderMode + panelUniqueId contract tests. Locks the saved-…, row_table forcibly clears any panelUniqueId payload — the contract guarantees…, Transitioning to panel_layout requires panelUniqueId on the wire (or already-…, row_table forcibly clears the panel binding even if the PATCH did not…, lighting_fixture_schedule behaves like row_table — no panel binding required. A…, Unknown render modes must be rejected with 400 (regression guard). (+46 more)

### Community 135 - "guard_derived_read"
Cohesion: 0.07
Nodes (47): _model_readable(), Per-model read authorization for the navigation allowlist. Mirrors…, env_enforcement_mode(), identity_selfservice_active(), lifecycle_active(), parse_mode(), Rollout configuration for the Authorization-Inheritance read gate — mode…, True when the /account/identity self-service surface is mounted (default… (+39 more)

### Community 136 - "UpstreamResponse"
Cohesion: 0.05
Nodes (28): A raw upstream (or mock) response. ``headers`` keys are lower-cased. Either…, Drain ``stream`` into ``body`` (for the cacheable manifest path). No-op when…, UpstreamResponse, HttpDerivativeUpstream, HttpSdkUpstream, Real APS upstream: fetches derivative bytes via the pooled APS client. Bearer…, Same pooled client, but redirects are NEVER followed: the SDK proxy maps any…, _Upstream (+20 more)

### Community 137 - "test_pdp_g1_sdk_proxy_tenancy.py"
Cohesion: 0.10
Nodes (51): _asgi_get(), _assert_denied(), _base(), _bearer(), _cdn_url(), _file_url(), _manifest_url(), _own() (+43 more)

### Community 138 - "access.py"
Cohesion: 0.07
Nodes (50): bind_projects(), _bindings(), can_manage(), can_read(), can_upload(), DocMeta, _gate_engaged(), grant_capability() (+42 more)

### Community 139 - "test_phase9_product_ingestion_v06_rules.py"
Cohesion: 0.07
Nodes (52): canonical_supply_voltage(), _control_adjacent(), _paired(), canon(), One supply-voltage token: canonical ``value``; raw = ``line[start:end]``., Supply-voltage tokens on one line, in line order (policy above). Kinds are…, Canonical spelling of a whole supply-voltage string, else ``None``. The string…, scan_supply_voltages() (+44 more)

### Community 140 - "test_w9_lane_f_regressions.py"
Cohesion: 0.05
Nodes (37): _counts_wiring(), _resolve(), _tripwire(), _IconClient, _icons(), _tok(), _manifest(), parametrize (+29 more)

### Community 141 - "test_circuit_schedule.py"
Cohesion: 0.09
Nodes (49): assemble_circuit_schedule(), build_circuit_rows(), circuit_synthetic_id(), _format_load_type(), _format_percent(), _load_type_summaries(), _panel_load_summaries(), Circuit-schedule shaping (Wave 4.8). Pure-Python — no fastapi/DB/AEC-DM imports… (+41 more)

### Community 142 - "test_budget_reservation_dblane.py"
Cohesion: 0.10
Nodes (50): held_tokens(), Sum of live holds: ``held`` reservations whose TTL has not passed. The expiry…, ClientBudgetReservation, One admission-time hold on a firm's output-token budget (M-1(b), WFA 2026-09-07…, _budget(), firm(), fixture, M-1(b) (WFA 2026-09-07 B2): client-budget reservations, DB lane. Proven against… (+42 more)

### Community 143 - "test_nl_filter_validation.py"
Cohesion: 0.12
Nodes (50): Return True if tree is a structurally valid FilterTree with allowed column…, _validate_filter_group(), _validate_filter_tree(), _group(), _leaf(), parametrize, Characterization tests for the NL-filter security validators…, test_allowlist_set_is_not_mutated() (+42 more)

### Community 144 - "b4d7e2f9c1a3_phase9_firm_owned_bindings.py"
Cohesion: 0.08
Nodes (45): _count(), downgrade(), _has_table(), _index_names(), _lock(), _refuse_if_rows_exist(), _ts(), upgrade() (+37 more)

### Community 145 - "migrate.py"
Cohesion: 0.07
Nodes (50): assert_single_head(), _config(), _current_revision(), ensure_assistant_readonly_role(), ensure_schema_ready(), get_heads(), MultipleHeadsError, RuntimeError (+42 more)

### Community 146 - "fixture"
Cohesion: 0.04
Nodes (44): fixture(), _cleanup_action_logs(), committed(), _FakeAuditSession, Independent-session stand-in: rows are durable only once .commit() ran., Patch the independent-session seam; return the list of durably committed rows., captured(), _Grant (+36 more)

### Community 147 - "share_authority.py"
Cohesion: 0.07
Nodes (47): _active_share(), _lookup(), _binding_hub(), _coerce_firm_id(), _grantee_not_proven(), _indexed_hub_id(), _no_autoflush(), _own_reach_blocks_share() (+39 more)

### Community 148 - "test_assistant_model_routing.py"
Cohesion: 0.09
Nodes (48): _client(), parametrize, Model routing slice 1A — the assistant router + loop honour the resolver. HTTP…, Slice 2: an admin-fixed policy silently substitutes the firm's model for any…, Same enforcement on the /resume path, driven through a stored pending turn…, R2: unauthenticated → 401, raised by require_active_membership's…, The firm's compiled default (sonnet-5) isn't on this allowlist — the endpoint…, allowed_model_ids gates on credential.route alone (same contract /chat's picker… (+40 more)

### Community 149 - "scheduler.py"
Cohesion: 0.08
Nodes (42): AclSourceFactory, authz_scheduler_enabled(), get_stats(), _null_source_factory(), Any, datetime, Event, timedelta (+34 more)

### Community 150 - "artifacts_router.py"
Cohesion: 0.09
Nodes (49): Map an ORM row into the pure decision's read-model., to_view(), _admin_audit(), _ArtifactContentOut, _ArtifactOut, _assert_hub(), _autodesk_first_read_ceiling(), capture_manual_draft() (+41 more)

### Community 151 - "test_identity_router.py"
Cohesion: 0.14
Nodes (44): LinkedIdentityView, What the UI may see about one link. No subject, no raw issuer, no token…, LinkDecision, _attach(), _client(), _FakeSession, Self-service identity HTTP surface — /account/identity (AUTH-INH plan §7b.4).…, A caller supplying its own identity fields gains nothing: verification still… (+36 more)

### Community 152 - "test_seed_writer.py"
Cohesion: 0.10
Nodes (45): PlannedProjection, One projection row the writer should upsert. Field names mirror…, apply_project_seed(), _build_upsert(), diff_seed(), is_backfill_provenance(), _load_serving_rows(), Any (+37 more)

### Community 153 - "CredentialSelection"
Cohesion: 0.04
Nodes (26): CredentialSelection, Tagged outcome of firm credential resolution (model routing slice 1A). tag…, True only for a verified customer key (tag ok, non-null key) on a BYOK route., The key to hand the provider client: the firm's key on the BYOK route, None (=…, Any, BaseException, Patch nl_filter's collaborators; return the recorder. ``ai_policy`` is what the…, wire() (+18 more)

### Community 154 - "product_bindings.py"
Cohesion: 0.08
Nodes (48): binding_counts(), BindingConflict, BindingCounts, bindings_for_product(), BindOutcome, demote_confirmed_bindings(), ElementNotFound, _firm_model_scope() (+40 more)

### Community 155 - "test_chat_gate_cache_only_dblane.py"
Cohesion: 0.07
Nodes (31): _Decision, _FakeDb, _FakeQuery, no_probe(), _no_raw_ids(), fixture, parametrize, W9 lane C — Slack / Teams project gate: hashed denial logs (F7) and a real… (+23 more)

### Community 156 - "test_model_policy_router.py"
Cohesion: 0.12
Nodes (41): _actor(), _client(), _FakeSession, _plan(), fixture, Model routing slice 2: the /account/model-policy HTTP surface (GET member-…, claude-opus-5 is BYOK-only (supported_for_platform=False); a firm on the…, No registry entry is background-only today (chat is in every active entry's… (+33 more)

### Community 157 - "test_assistant_write_guard.py"
Cohesion: 0.07
Nodes (41): assistant_scope(), _guard(), P1-epsilon: least-privilege write guard for the assistant's tool scope. The…, Mark the current context as 'assistant tool dispatch in progress'., stop_counts(), build_observation(), _coerce_uuid(), normalize_filter_tree() (+33 more)

### Community 158 - "_el"
Cohesion: 0.10
Nodes (12): assemble_ict_cctv_schedule(), build_ict_cctv_rows(), _mark_sort_key(), Instance-grain CCTV/security-camera rows, sorted by Mark. All elements from…, assemble_ict_data_outlet_schedule(), build_ict_data_outlet_rows(), _mark_sort_key(), Instance-grain data-outlet rows (data jacks, network drops), sorted by Mark.… (+4 more)

### Community 159 - "test_integrations_readiness.py"
Cohesion: 0.08
Nodes (41): Redacted readiness for one declared kind. Raises UnknownIntegrationConfigError…, Every REGISTERED kind (contract.INTEGRATION_KINDS), in sorted kind order.…, readiness_for(), snapshot_integration_readiness(), dict, _complete_env(), _every_env(), _Hostile (+33 more)

### Community 160 - "test_assistant_loop.py"
Cohesion: 0.08
Nodes (27): _Block, _collect(), FakeClient, FakeMessages, _msg(), Wire _with_reservation for a fail-closed test: fast cadence, captured settle,…, _renew_harness(), _stuck_turn() (+19 more)

### Community 161 - "test_admin_auth.py"
Cohesion: 0.06
Nodes (44): AdminBootstrapInvariantError, bootstrap_admin_roles(), is_admin_email(), Request, RuntimeError, Session, Verify a Google ID token; return the verified email. Raises 401 on any failure.…, Authorize the request and return the verified admin email. Google ID token +… (+36 more)

### Community 162 - "test_assistant_parameter_writes_dblane.py"
Cohesion: 0.05
Nodes (47): load_proposal_for_revert(), Load a proposal as the anchor for a revert (P15-15D). Scoped to the calling…, _dispatch_write_tool(), Invoke a WRITE_DISPATCH handler for resume(), bridging sync and async handlers…, _cleanup_proposals(), DB-lane test for the assistant_parameter_proposals table -- real rows via the…, CQ-NEW-1 (rewritten for WSR8 step 2): the raw single-write primitives…, P15-15C-B: read_live_category is advertised to the model ONLY when BOTH… (+39 more)

### Community 163 - "lifecycle_router.py"
Cohesion: 0.08
Nodes (43): build_purge_report(), PurgeCounts, PurgeReport, PurgeSubsystem, Enum, str, Project-unenrollment purge — the data-lifecycle offboarding seam (AUTH-INH plan…, Assemble a :class:`PurgeReport` from the four wired subsystem row counts. Pure:… (+35 more)

### Community 164 - "test_client_ip.py"
Cohesion: 0.10
Nodes (44): client_ip(), _forwarded_client(), load_config(), _parse_address(), parse_config(), Request, Client address for rate-limit keying behind an explicitly trusted proxy. The…, Bare IP address or None. Rejects "ip:port" and "[v6]"; folds IPv4-mapped IPv6… (+36 more)

### Community 165 - "QaAnalysisRun"
Cohesion: 0.11
Nodes (46): compare_runs(), _engine_version(), _finding_detail(), _finding_out(), history_retention_runs(), list_history(), _match_key(), _prune_retention() (+38 more)

### Community 166 - "test_qa_overrides.py"
Cohesion: 0.05
Nodes (37): import_rules(), Session, Replace the project's imported rules with `rules` (delete-then-insert). Returns…, delete_override(), load_overrides(), Any, Session, Return {rule_id: {enabled?, severity?, value?}} for the project (empty if… (+29 more)

### Community 167 - "test_transformer_schedule.py"
Cohesion: 0.09
Nodes (45): assemble_transformer_schedule(), build_transformer_rows(), _format_impedance(), _format_kva(), _format_primary_voltage(), _format_secondary_voltage(), _parse_kind(), parse_transformer_family() (+37 more)

### Community 168 - "sqlalchemy"
Cohesion: 0.08
Nodes (44): downgrade(), _index_names(), _insp(), _nullable(), Phase 9 — canonical product key option B (owner decision 2026-09-24).…, _refuse_if_unkeyed_rows_exist(), _unique_names(), upgrade() (+36 more)

### Community 169 - "_build"
Cohesion: 0.06
Nodes (27): _b64url(), _b64url_json(), build_ssa_assertion(), signer(), Da4rTokenError, exchange_ssa_assertion(), get_lifecycle_token(), Any (+19 more)

### Community 170 - "test_artifacts_router.py"
Cohesion: 0.11
Nodes (37): _client(), _draft(), _FakeSession, fixture, Track-2 v1 published-artifact HTTP surface (AUTH-INH Phase 5, plan §5.6). DB-…, A caller with no Autodesk session hits the hub probe on a cache MISS (401) and…, Neutral defaults: hub allows, membership resolves to a principal+member role,…, _row() (+29 more)

### Community 171 - "test_authz_share_owner_liveness.py"
Cohesion: 0.08
Nodes (38): _DB, _matches(), parametrize, _Query, Owner liveness is load-bearing for a cross-firm share allow (review pass-2 #2).…, The owner was removed from the project in ACC and reconcile deleted its rows.…, CURRENT without provenance" is the projection's own fail-closed case; the owner…, The projection is keyed per principal, so "the owner firm still reaches this"… (+30 more)

### Community 172 - "authz_telemetry.py"
Cohesion: 0.07
Nodes (38): DecisionEvent, histogram_from_snapshot(), note_redis_unavailable(), _percentile(), Any, Autodesk-first decision telemetry (W7.1a): one structured event per…, Thread-safe in-process counters. All public methods are safe from any thread., JSON-serialisable, value-free view: counts, rates, latency percentiles (overall… (+30 more)

### Community 173 - "test_router.py"
Cohesion: 0.07
Nodes (36): ProvisioningJob, One Project Setup Wizard run (Phase 8). `created_resources` is an ORDERED…, client(), _consent_env(), _make_planning_job(), fixture, parametrize, TestClient integration tests for the Phase 8 wizard router (no-write slice).… (+28 more)

### Community 174 - "test_teams_security.py"
Cohesion: 0.08
Nodes (46): Drop the cached JWKS client (tests, and any future key-roll forcing)., reset_key_cache(), _key_lookup(), fixture, Microsoft Teams Assistant Gateway -- inbound token validation tests. The Teams…, Clock skew between Microsoft and this host is normal; a token that expired 60s…, The reply destination arrives in an UNSIGNED body. Without this check a valid…, Fail closed, not open: a token with no serviceurl claim cannot vouch for any… (+38 more)

### Community 175 - "_fake_token"
Cohesion: 0.08
Nodes (42): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/circuit_schedule endpoint contract. Mirrors…, Replace `_load_warm_relationships` (the GA-H5 warm probe) with a stub that…, Make `get_user_token` return a non-empty token so _require_auth passes., Happy path: 200, circuits list, versionNumber stamp., Only "Electrical Circuits" elements become rows; other categories excluded.…, A GENUINE upstream failure (typed AecUpstreamError) is mapped to 502. GA-M2:… (+34 more)

### Community 176 - "test_categories_cache.py"
Cohesion: 0.08
Nodes (31): key_categories(), _load_cached_categories(), _clear_categories_cache(), _fake_list_categories(), _fake_tip(), fake(), _FakeStore, _patch_persist() (+23 more)

### Community 177 - "test_aps_cache.py"
Cohesion: 0.05
Nodes (44): _fake_paginated_authed_get(), _fake_tree_authed_get(), _FakeJSONHit, _grant_all_projects(), fixture, Wave 4.6.6 Session A — APS pooling + TTL cache (tests). Mirrors Wave 4.6.5…, clear() empties every cached entry (so the next call recomputes) AND the per-…, Yield the stashed real aps.router (collected from sys.modules at this test… (+36 more)

### Community 178 - "test_phase9_product_bindings_router.py"
Cohesion: 0.14
Nodes (43): _dependency_calls(), _audits(), _bind(), _client(), _doc(), _product(), Phase 9 router (aec/product_bindings_router.py) — DB lane, real session. The…, Auth deps → `firm`; hub resolution → `hub` (None = unresolvable); allowed hubs… (+35 more)

### Community 179 - "test_firm_docs_cka_authz_dblane.py"
Cohesion: 0.11
Nodes (44): _as(), _cap_audits(), _cap_rows(), _draft_member_with_grant(), _env(), _firm(), _hits(), _ids() (+36 more)

### Community 180 - "ApsWriteError"
Cohesion: 0.10
Nodes (27): ApsWriteErrorTests, _account_id_from_hub(), ApsWriteError, ApsWriteHttpClient, _contained_source_path(), _error_excerpt(), _parse_object_urn(), Any (+19 more)

### Community 181 - "ClientBudget"
Cohesion: 0.08
Nodes (40): BudgetBody, upsert_budget(), check_preflight_budget(), get_tokens_used(), datetime, UUID, Per-firm assistant budget gate (Phase 6 / hard cost guardrails). Preflight…, Sum output_tokens for this firm over the rolling window. (+32 more)

### Community 182 - "test_type_grain_rollup.py"
Cohesion: 0.09
Nodes (41): _plumbing_fixture_system_summaries(), Fixture count + total water fixture units (WFU) per System. Per-type WFU is…, _pipe_system_summaries(), Run count + total length (m) per System. Length stays raw SI metres so the…, _aggregate_column(), _build_summary_rows(), _is_numeric(), Type-vs-Instance rollup helpers (Phase 3.5.5 sub-track 2). Pure-Python module —… (+33 more)

### Community 183 - "product_review_router.py"
Cohesion: 0.12
Nodes (44): BulkIn, BulkItemIn, BulkOut, decide(), decide_bulk(), DecisionIn, EvidenceOut, FieldOut (+36 more)

### Community 184 - "test_assistant_tools.py"
Cohesion: 0.05
Nodes (18): _elec_loaders(), _NullSession, Stand-in session for handler tests that monkeypatch the data loaders: the…, Pillar 3 (audit G3): every match carries its doc slug so the UI can render a…, Pillar 3 Groups parity: an unidentified caller (no firm) sees NO groups —…, _reset_ctx_pool_cache(), _run_circuit_filter_cache(), test_analyze_electrical_topology_tool_flags_unconnected() (+10 more)

### Community 185 - "serving.py"
Cohesion: 0.11
Nodes (42): check(), EnforcementOutcome, Result of applying a mode to a decision. ``serve`` — whether the caller…, assert_projection_authority(), guard_read(), guard_read_lazy_firm(), Any, Route/worker-facing sugar over :mod:`aec.authz.guard` (plan v3 §7b.8, Phase 3… (+34 more)

### Community 186 - "help_library.py"
Cohesion: 0.07
Nodes (37): Chunk, chunk_markdown(), Heading-path-aware markdown chunking, vendored from the docindex algorithm…, Split markdown into retrievable chunks at heading boundaries. Sections longer…, build_index(), _fingerprint(), Per-firm BM25 chunk index: build, persist (versioned + fingerprinted), load…, Sorted [(doc_id, mtime_ns, size)] over the live docs' text files. A doc whose… (+29 more)

### Community 187 - "test_scope_guards.py"
Cohesion: 0.09
Nodes (41): issue_join_probe(), Session, UUID, R1 identity-join probe (read-only, diagnostics-gated). Answers the make-or-…, Read-only R1 join probe. See run_join_probe for the verdict taxonomy., Fetch one issue and classify how deterministically its pushpin joins to a…, run_join_probe(), product_in_hub() (+33 more)

### Community 188 - "test_param_aliases.py"
Cohesion: 0.09
Nodes (40): alias_map(), AliasMap, contexts(), ParamAlias, Canonical names in declaration order., The validated AliasMap for `(firm, context)`. Maps are built once at import;…, Registered context names for `firm`, in declaration order., No alias rules are registered for the (firm, context) pair. (+32 more)

### Community 189 - "test_schema_persist.py"
Cohesion: 0.07
Nodes (36): get_property_map(), key_property_map(), key_spec_map(), Returns { "category": <prop_name>, "family_name": <prop_name> }. Probes one…, _call_refresh(), _cleanup(), _clear_in_memory(), _durable_keys() (+28 more)

### Community 190 - "ManifestCache"
Cohesion: 0.07
Nodes (30): ManifestCache, A tiny bounded backend-side cache for manifest metadata, keyed by the SERVER-…, True while an unexpired negative memo exists for ``key``; an expired one is…, _inflight_map(), _manifest_miss_key(), _fetch_manifest(), _remember_miss(), Key for the short-lived NEGATIVE memo of a failed candidate-manifest fetch.… (+22 more)

### Community 191 - "test_w9b_review_fixes.py"
Cohesion: 0.06
Nodes (26): ConnectionError, ceiling(), _CeilingDb, _dead_cache(), _DeadClient, _env(), _fresh(), _key() (+18 more)

### Community 192 - "test_teams_client.py"
Cohesion: 0.08
Nodes (40): httpx, _base(), _connector(), create_direct_conversation(), get_app_token(), post_message(), post_private_message(), Exception (+32 more)

### Community 193 - "test_aps_read_token_refresh_leak.py"
Cohesion: 0.09
Nodes (38): aps_auth(), aps_router(), _getter(), _http_status_error(), Exception, fixture, Regression: a failed token refresh must not leak as a bare HTTP 500 on the…, _spy_clear() (+30 more)

### Community 194 - "test_log_redaction.py"
Cohesion: 0.08
Nodes (30): _assert_clean(), _blob(), _log_calls(), parametrize, W5 P1F item 12: no raw URN, id or upstream exception text reaches a log line.…, Log calls in ``path`` (filtered by their source text) that are log.exception,…, access_cache._log_invalidation logged the raw Autodesk user id in the message…, The same raw id on the Redis-unavailable line, which carries it in ``extra``. (+22 more)

### Community 195 - "FakeProvisioningClient"
Cohesion: 0.10
Nodes (18): ExecutorTests, FakeProvisioningClient, _items(), Pure-lane tests for the provisioning executor (Phase 8). Stdlib unittest, in-…, Records creates/resolves/deletes; can be told to fail on a given name/path., Hand-built plan exercising the executor's full item vocabulary (project clone →…, ApsProvisioningClient, ExecutorError (+10 more)

### Community 196 - "test_admin_delegation_router.py"
Cohesion: 0.08
Nodes (26): client_admin_delegation_enabled(), True iff the client-admin delegation surface is mounted (dark by default)., _client(), _entity_name(), _FakeQuery, _FakeSession, fixture, TestClient (+18 more)

### Community 197 - "test_circuits.py"
Cohesion: 0.12
Nodes (41): build_circuit_rows(), infer_circuit_load_type(), Circuits as a virtual category (Wave 4.5.5 Session 1, extended Wave 4.5.6).…, Build a flat list of circuit-row records aggregated across all panels. Args:…, Raw section suffix on the panel ("(SEC 2)") or "" when absent., Best-effort load_type for a circuit based on the connected devices. Picks the…, _section_label(), _device() (+33 more)

### Community 198 - "test_classification_enrichment.py"
Cohesion: 0.07
Nodes (41): enrich_classification(), enrich_classification_batch(), get_classification_for_category(), _is_populated(), _make_enriched_value(), Any, BIMpossible — Classification Enrichment Layer Wave 4.9 — lookup tables +…, Return True if any alias in the set has a non-empty value in parameters. (+33 more)

### Community 199 - "test_coordination_report.py"
Cohesion: 0.10
Nodes (41): build_header(), build_report_payload(), build_trace_examples(), describe_critical_hubs(), _esc(), _finding_line(), generate_coordination_report(), Any (+33 more)

### Community 200 - "production_readiness.py"
Cohesion: 0.13
Nodes (42): EnvCheck, FlagFamily, _alembic_head_result(), _check_admin_bootstrap(), _check_aps(), _check_autodesk_first(), _check_autodesk_first_requires_redis(), _check_cross_firm_sharing() (+34 more)

### Community 201 - "test_autodesk_first_d1_all_grants.py"
Cohesion: 0.09
Nodes (31): _Aps, _as_user(), _scope(), change_set(), _clean_rows(), _enroll(), _flag(), fixture (+23 more)

### Community 202 - "test_consent.py"
Cohesion: 0.09
Nodes (38): _clear(), SEC-CONSENT-REUSE-1 (2026-08-17 weekly audit) — the elevated write-scoped token…, test_expired_token_dropped_even_with_uses_left(), test_max_uses_never_exceeds_autodesk_ttl_bound(), test_token_reusable_up_to_cap_then_forces_reconsent(), Unit tests for wizard/consent.py — the provision-time elevated-consent token…, The point of the assertion above is scope CREEP control, so state the invariant…, test_autodesk_expiry_shorter_than_session_ttl_wins() (+30 more)

### Community 203 - "record_badge_use"
Cohesion: 0.09
Nodes (35): True when the Service-Account badge alert emission is enabled (default False)., service_alert_active(), _build_row(), Any, datetime, I/O side of Service-Account (badge) log-distinctness + alerting (AUTH-INH §7b.3…, Record one Service-Account badge use and return its classification. Known job →…, Shape the ``actor_type="service"`` decision-stream row for one badge use.… (+27 more)

### Community 204 - "test_track2_content_authz.py"
Cohesion: 0.09
Nodes (40): authorize_track2_content_read(), _in_audience(), AccessLevel, datetime, Enum, SourceAuthorizer, str, Track-2 v2 role-scoped model-derived content — the pure read-authorization… (+32 more)

### Community 205 - "test_filter_eval.py"
Cohesion: 0.08
Nodes (40): apply_filter(), _eval_leaf(), _eval_node(), _field_value(), FilterDepthError, FilterOperatorError, _num(), ValueError (+32 more)

### Community 206 - "model_discovery.py"
Cohesion: 0.09
Nodes (36): _all_target_categories(), _authenticate(), count_categories(), format_report(), _list_rvts_async(), main(), ModelHit, rank_canonical() (+28 more)

### Community 207 - "test_qa_router.py"
Cohesion: 0.09
Nodes (41): get_model_health(), Model-health report: overall score + per-rule compliance + findings. Read-only.…, _call_export(), _call_health(), _cleanup(), _deny_access(), _good_token(), _job_count() (+33 more)

### Community 208 - "bench_derivative_proxy.py"
Cohesion: 0.09
Nodes (30): argparse, statistics, _authorize(), _call(), _drain(), main(), _measure(), Any (+22 more)

### Community 209 - "ChangeSet"
Cohesion: 0.12
Nodes (39): ChangeSet, ChangeSetStatusHistory, A named, reviewable batch of staged parameter edits targeting one model., Append-only status-transition log for ChangeSet (Audit & History Pattern §4…, _approved_by_author_with_marker(), _as(), _drop(), firm() (+31 more)

### Community 210 - "uuid"
Cohesion: 0.08
Nodes (37): autodesk_first_entitled(), _ceiling(), firm_env(), fixture, APS hub isolation on the change-set READ routes (2026-09-07 Weekly Full Audit,…, Enforcement OFF: a change set the firm owns but whose project is outside its…, Phase 13 history read carries the detail read's hub gate: same firm, project…, Review F4: each single-change-set read names ITSELF to the Autodesk-first… (+29 more)

### Community 211 - "test_synthetic_seed_optin_guard.py"
Cohesion: 0.07
Nodes (40): _assert_refused(), clean_init_handlers(), _fire_init(), _import_locustfile(), _locustfile_path(), fixture, Path, WSR16 / CQ-SYNTH-HOST-ENV-1 — the load generator must refuse a non-loopback… (+32 more)

### Community 212 - "test_effective_access.py"
Cohesion: 0.12
Nodes (40): compute_effective_access(), evaluate_access(), timedelta, The effective level for ``principal`` (thin wrapper over…, Return the ALLOW/DENY decision for a stored projection record — fail closed…, Principal, ProjectionRecord, SubjectType (+32 more)

### Community 213 - "test_identity_link_flow.py"
Cohesion: 0.11
Nodes (39): _b64d(), _b64e(), _epoch(), evaluate_unlink(), issuer_label(), mint_state(), datetime, Pure core for the self-service identity-link flow (AUTH-INH plan §7b.4). What… (+31 more)

### Community 214 - "firm_docs_router.py"
Cohesion: 0.10
Nodes (39): _actor_user_id(), _audit(), delete_document(), _doc_json(), grant_capability(), _hidden_draft_user_ids(), list_capabilities(), list_documents() (+31 more)

### Community 215 - "test_cold_load_perf.py"
Cohesion: 0.08
Nodes (40): _rate_limit_backoff_seconds(), Seconds to gate a rate-limited job before re-claim. Honors a server Retry-After…, _resolve_concurrency(), _arch_room_prewarm_enabled(), _proactive_prewarm_enabled(), Kill-switch for the model-open proactive category warm (cold-load perf).…, Enqueue a durable category-warm job per category so the background pool warms…, Kill-switch for the model-open architectural room-geometry warm (Phase 3.10a).… (+32 more)

### Community 216 - "pytest"
Cohesion: 0.10
Nodes (38): product_ingestion_enabled(), Canonical flag read (Wave 5 CFG-A / O7 semantics via ``env_flag``): only…, pytest, _apply(), _has(), _job(), _load(), db_lane (+30 more)

### Community 217 - "test_qa_ids_import.py"
Cohesion: 0.10
Nodes (39): _category_for(), _numeric_bound(), parse_ids(), parse_ids_report(), _q(), buildingSMART IDS (.ids) import → QA Rules (Phase 11). Parses the common IDS…, Return (op, value) from a <value> facet's xs:restriction, or (None, None)., Parse an IDS document into QA Rules, plus which specs used an unmapped IFC… (+31 more)

### Community 218 - "test_aps_hub_isolation.py"
Cohesion: 0.09
Nodes (33): _assert_enroll_denied(), _probe_recorder(), Phase 6 (2026-08-06) — /aps route-level hub isolation. DB/app lane.…, Satisfy both auth layers ahead of the hub verdict: the router-level session…, require_project_in_firm_hub_path on /aps/project/{id}/top-folders., require_project_in_firm_hub (query) on /aps/model/manifest., Hub gate satisfied + project ENROLLED -> the handler runs. PROJ is NOT in any…, The unenrolled 403 — distinct from the cross-hub deny, so a client can tell… (+25 more)

### Community 219 - "test_autodesk_first_read_paths.py"
Cohesion: 0.12
Nodes (35): _as_user(), _assert_no_foreign_leak(), _flag(), parametrize, Option B / B4 part a: the Autodesk-first ceiling on user-initiated READ paths.…, C4: one firm-wide index; each user sees the slice their own Autodesk token…, C4: user-b saves the firm's presets; user-a (also entitled to the project)…, The router is mounted only when its feature is enabled; drive it on a throwaway… (+27 more)

### Community 220 - "test_change_set_mutation_hardening.py"
Cohesion: 0.10
Nodes (38): _as(), _draft(), _in_status(), _mutations(), out_of_hub_set(), fixture, parametrize, real_hub_tenancy (+30 more)

### Community 221 - "test_track2_content_router.py"
Cohesion: 0.14
Nodes (32): _allow_seams(), _client(), _FakeSession, _get_access(), _grant_body(), _grant_view(), fixture, Track-2 v2 role-scoped content HTTP surface (AUTH-INH Phase 6, plan §5.5). DB-… (+24 more)

### Community 222 - "test_ai_context_policy_router.py"
Cohesion: 0.13
Nodes (31): AdminScope, A client admin's delegated authority within ONE firm. ``project_ids`` None =…, ProjectAiContextPolicy, Per-(firm, project) AI context policy (D1/D2 2026-09-13; firm-scoped SEC-1,…, _audit_rows(), _client(), _config_row(), _FirmKeyedStore (+23 more)

### Community 223 - "test_phase9_product_ingest_jobs_router.py"
Cohesion: 0.09
Nodes (34): RequestReason, _client(), env(), _job(), fixture, parametrize, Phase 9 review router — ``/ingest-jobs`` (list) and ``/ingest-…, A ``duplicate_keyed`` job never echoes its product id -- not even a hub-global… (+26 more)

### Community 224 - "test_assistant_conversations_endpoint.py"
Cohesion: 0.10
Nodes (23): _async_const(), _auth(), _client(), Phase 4c Slice 1: /assistant/conversations endpoints + chat persistence wiring.…, _generate_title (invoked by _persist_turn for a brand-new conversation)…, _generate_title's except block previously only logged a warning and returned…, When a write tool triggers a pause, run_agent_turn yields an approval-request…, _run_chat() (+15 more)

### Community 225 - "test_autodesk_first_routes.py"
Cohesion: 0.10
Nodes (33): _Aps, _as_user(), _clean_rows(), _enrollment_rows(), fixture, Option B / B2 — Autodesk-first discovery through the real /aps routes. DB/app…, Make the signed-in user `user_id` with bearer `token` for the per-user path., W5 P1F item 2: under the flag discovery is the user's Autodesk hubs AND the… (+25 more)

### Community 226 - "test_enrollment_endpoints.py"
Cohesion: 0.08
Nodes (32): admin_client(), _audits(), _commit_raising(), _commit(), _fake_visible_hubs(), _fake(), _FakeDiag, _FakePgError (+24 more)

### Community 227 - "test_pane_pairing_endpoints.py"
Cohesion: 0.10
Nodes (36): _authed_client(), _FakeClient, _FakeRequest, _pair(), _plant_web_session(), _proxy_env(), Phase 15a -- pane pairing HTTP surface (/auth/pane/*) + the X-Pane-Session…, Even a VALID pane token must not resolve while the flag is off. (+28 more)

### Community 228 - "test_pdp_containment.py"
Cohesion: 0.10
Nodes (31): _auth(), _bg_sid(), _client(), _FakeStore, _gate(), _identity(), _jobs(), _probe_spy() (+23 more)

### Community 229 - "test_qa_history_capture_purge.py"
Cohesion: 0.12
Nodes (38): Run the read-only QA rules over the WHOLE model and return a COMPACT health…, tool_check_model_health(), maybe_record_snapshot(), purge_tombstoned_history(), The single shared capture boundary for every serving path (model-health,…, Days a lineage must stay tombstoned before its history is purged. Tombstones…, Delete this project's QA history for lineages tombstoned past the grace window.…, tombstone_purge_grace_days() (+30 more)

### Community 230 - "effective_access.py"
Cohesion: 0.10
Nodes (36): AccessLevel, EffectiveAccess, normalize_action_set(), normalize_level(), Product, ProjectionRecord, datetime, Enum (+28 more)

### Community 231 - "test_authz_health_query.py"
Cohesion: 0.10
Nodes (30): health_from_counts(), datetime, fetch_projection_health(), fetch_provenance_counts(), datetime, timedelta, DB glue for projection-health observability (plan v3 §7b.9). The math lives in…, Aggregate ``permission_projection`` into a :class:`ProjectionHealth` for a… (+22 more)

### Community 232 - "test_cross_model_join_doors.py"
Cohesion: 0.10
Nodes (37): _merge_door_room_columns(), Phase 3.10b — the Doors counterpart of _merge_linked_room_columns. Same…, _door(), Phase 3.10b — Doors room-pair join tests. Pure-function tests, no network/DB.…, The federated-overlay case, measured 2026-08-04 on mv 742: a shell/core arch…, The deliberate cost of boundary-native scoring (2 doors of 782 on the live…, The regression guard for finding #1. At the MEP 3.0 ft cap a door sweeps up…, Finding #2: unbanded, the pair rate is 1.5% — a door is within 0.5 ft in XY of… (+29 more)

### Community 233 - "sanitize_filename"
Cohesion: 0.10
Nodes (37): Returns (ascii_safe, pct_encoded) per RFC 6266 / TC2231. ascii_safe: ctrl/path-…, sanitize_filename(), filename_utils — adversarial / behavioral tests for sanitize_filename.…, test_ascii_boundary_char_127_stripped_128_underscored(), test_ascii_safe_is_always_pure_ascii(), test_ascii_safe_never_contains_crlf_for_arbitrary_input(), test_cjk_name_each_char_to_underscore(), test_crlf_smuggling_attempt_collapsed() (+29 more)

### Community 234 - "test_sync_token.py"
Cohesion: 0.05
Nodes (19): Phase 7 Revit Link sync re-enable (2026-07-16): a THIRD default-off flag,…, revit_link_sync_enabled(), Test hook: clear the in-process consumed-jti registry. Not for production use., _reset_consumed_for_tests(), _configured_secret(), fixture, parametrize, Tests for revit_link/sync_token.py - the one-time elevated Sync token. Pure-… (+11 more)

### Community 235 - "nl_filter_harness.py"
Cohesion: 0.08
Nodes (30): Case, case_from_obj(), CaseRun, _cell_value(), fixture_column_values(), fixture_columns(), fixture_unique_ids(), format_report() (+22 more)

### Community 236 - "test_assistant_resume.py"
Cohesion: 0.11
Nodes (31): _clear_pending(), _client(), fixture, Phase 4b: POST /assistant/resume endpoint integration tests. Closes the 4b DoD…, SEC-NEW-1: /resume re-checks the per-firm budget before the ack model turn — an…, M-1(b): the hold is taken BEFORE the confirmed write. A firm within `amount` of…, M-1(b): a continuation that fails AFTER its hold is taken but BEFORE the stream…, Regression: /resume was missing usage_ctx so the ack model turn wasn't metered.… (+23 more)

### Community 237 - "test_w7_telemetry_hooks.py"
Cohesion: 0.12
Nodes (27): _Aps, _events(), _fresh(), ht(), fixture, W7.1a — the decision hooks: every Autodesk-first gate reports exactly one event…, assert_user_ceiling with firm_id: Layer 1 (probed allow) is recorded by the…, _run() (+19 more)

### Community 238 - "test_cache_reconcile.py"
Cohesion: 0.12
Nodes (35): _aps_probe(), ProbeResult, Ask APS whether the project is still reachable, preserving the HTTP status so a…, _assert_names_setting_without_values(), missing_client_id(), _get_needing_credentials(), fixture, Wave 4 B2 (W3-Q2): background APS probes must not swallow a missing-config 503… (+27 more)

### Community 239 - "test_conversation_store.py"
Cohesion: 0.12
Nodes (36): append_turn(), create_conversation(), get_conversation(), list_conversations(), Phase 4c Slice 1: persistence for assistant conversations. Thin CRUD over…, Set a conversation's title (used by the post-turn Haiku auto-title). No-op if…, Recent conversations for (user, project), most-recently-updated first. Returns…, Create an empty conversation row; return its UUID id. (+28 more)

### Community 240 - "test_level_host_pattern_unit.py"
Cohesion: 0.05
Nodes (3): Shared compiled regex patterns for AEC normalization (C-Schema, WP-A5). Single…, WP-A5 (C-Schema): focused tests for the unified "Level : <name>" Host regex.…, WP-A5 (C-Schema): direct microtests for the unified "Level : <name>" Host…

### Community 241 - "test_ai_context_policy.py"
Cohesion: 0.09
Nodes (32): get_ai_context_policy(), Session, Return the (firm, project) AI context policy, FAIL CLOSED. 'help_only' → the…, _Block, _blocks(), _db_returning(), _FakeClient, skipif (+24 more)

### Community 242 - "test_boot_shared_state_guard.py"
Cohesion: 0.12
Nodes (35): _check_autodesk_first_shared_state(), _check_consent_state_worker_safety(), _check_shared_state_worker_safety(), 2026-08-23 audit: shared_state's MemoryStore (rate limits, refresh locks, pane…, W6 D3 (ratified): Autodesk-first must not activate unless Redis readiness…, weekly-full-audit_2026-09-11 SEC-1A: the wizard elevated-consent state…, _clear(), _clear_af() (+27 more)

### Community 243 - "test_pane_pairing.py"
Cohesion: 0.05
Nodes (26): _memory_store(), fixture, Phase 15a -- Revit pane pairing service (aps/pane_pairing.py). Service-level…, Sign-out invalidation (hard req #3): parent session gone -> pane session dead…, Belt-and-braces: the record carries expires_at and resolve() checks it itself,…, PANE_SESSION_TTL_SECONDS is an ABSOLUTE cap from redeem, not a sliding lease --…, Disabled-path probes are counted but logged at most once per window at the…, A pane token is a bearer credential, but /auth/pane/revoke takes it from the… (+18 more)

### Community 244 - "test_seed_planner.py"
Cohesion: 0.15
Nodes (35): Assignment, _matches(), Principal, One raw permission fact imported from Autodesk, attached to a single resource…, The reader whose effective access we are computing. A pure Track-2 (no-license)…, Aggregate raw Autodesk assignments into one effective level *and* its governing…, resolve_effective_access(), build_ancestry() (+27 more)

### Community 245 - "qa/router.py"
Cohesion: 0.09
Nodes (36): _authz_gate_authored_read(), _authz_gate_read(), compare_qa_history(), delete_qa_override(), export_model_health(), _assemble(), _assemble(), get_qa_history() (+28 more)

### Community 246 - "revit_link/audit.py"
Cohesion: 0.09
Nodes (31): Append-only log of every revit_link request, read and write. One row per…, RevitLinkRequestLog, _coerce_firm_id(), finalize_edit_log(), Any, UUID, Update a write-ahead 'pending' edit_log row in place (WIZ-7, 2026-07-08 audit)…, Never let a malformed firm id poison an audit insert (the firm_id='' UUID-cast… (+23 more)

### Community 247 - "enforcement.py"
Cohesion: 0.08
Nodes (29): Decision, datetime, Enum, Enforcement layer for the Authorization-Inheritance read gate — the mode…, Apply an enforcement mode to a raw allow/deny decision. Pure — no I/O, no…, resolve_enforcement(), parametrize, Pure tests for the enforcement mode machine (aec.authz.enforcement). No DB, no… (+21 more)

### Community 248 - "canonical_key"
Cohesion: 0.09
Nodes (27): _build_aliases(), canonical_key(), canonical_manufacturer(), _fold(), Canonical product identity key: ``(manufacturer, model_number) -> str``.…, Registry canonical name for ``name``, else ``name`` stripped., ``"<mfr>::<model>"`` folded key; ``None`` if either part is missing/blank., candidate_from_extraction() (+19 more)

### Community 249 - "_create"
Cohesion: 0.11
Nodes (17): Read-only time-limited share links for external consultants (Wave 7 / gap #9).…, ShareLink, test_recipients_me_and_anonymous_link_carry_no_project_identifiers_on(), _create(), _create_body(), fixture, Share v2 — frozen-snapshot share links (2026-08-08). DB/app lane only. Covers…, Synthetic creator-authorized element cache content. (+9 more)

### Community 250 - "nl_filter_monitor.py"
Cohesion: 0.12
Nodes (34): LookupError, current_pins(), _drift(), evaluate_live(), evaluate_offline(), format_line(), grounding_cap(), _hard_error_summary() (+26 more)

### Community 251 - "test_lock_order_dblane.py"
Cohesion: 0.11
Nodes (33): _firm_of(), _no_errors(), _patch_membership(), _call(), _commit(), Barrier, UUID, _race() (+25 more)

### Community 252 - "_patch_number_check_upstream"
Cohesion: 0.07
Nodes (24): _FakeAdminResponse, _patch_number_check_upstream(), get(), AUTH-INH §7b.3 #4: the onboarding account:read badge is recorded as a distinct…, Bootstrap preserved: single-tenant + zero grants keeps the prior global-…, Bootstrap preserved for number-check: single-tenant + zero grants still reaches…, RA-1 allow arm through the router: multi-tenant + the firm HOLDS the hub grant…, test_acc_templates_allows_granted_hub_when_multi_tenant() (+16 more)

### Community 253 - "build_request"
Cohesion: 0.09
Nodes (32): build_request(), check_context_guard(), estimate_tokens(), _has_project_context_block(), ProjectContextPolicyViolation, Any, RuntimeError, A project-context block reached the provider boundary under a policy that… (+24 more)

### Community 254 - "schema.py"
Cohesion: 0.08
Nodes (25): invalidate_schema_caches(), is_identity_prop(), _match_props(), _probe(), Property schema discovery for AEC Data Model element groups. Probes a sample of…, Map each canonical key to the model's ACTUAL property name, matched case-…, Drop the in-memory property + spec maps for one element group — the in-memory…, True if `name` is a known identity / stripped-variant prop, matched case-… (+17 more)

### Community 255 - "test_cloud_ids.py"
Cohesion: 0.12
Nodes (33): cloud_ids_from_item_tip(), cloud_path_ids(), _extension(), Open-in-Revit — pure cloud-ID resolvers (no I/O). Rebuild of the lost…, Compose `{region, projectGuid, modelGuid}` for a C4R tip, else None. None ⤢ not…, `data.attributes.extension` of an item-tip payload, or None on any shape…, `{projectGuid, modelGuid}` for a C4R cloud model's tip, else None. None means…, US" | "EMEA" | None from a Data Management URN's env segment. Works on any DM… (+25 more)

### Community 256 - "test_teams_manifest_and_tools.py"
Cohesion: 0.08
Nodes (30): _needs_router, Slack Assistant Gateway -- pins on the two lists that decide what the app can…, Verified against docs.slack.dev 2026-07-28, each justified by a real call:…, im:write governs conversations.open -- STARTING a DM. This app only ever…, help_only offers only search_help, which isn't excluded -- so filtering it is a…, test_help_only_set_is_unaffected_by_the_filter(), test_im_write_is_not_requested(), test_oauth_scopes_are_the_verified_minimum() (+22 more)

### Community 257 - "test_cross_model_join.py"
Cohesion: 0.12
Nodes (34): _equipment(), Phase 3.10a — cross_model_join characterization tests. Pure-function tests, no…, WARM-ORIGIN-DOORGAP. "no_location" means "we have no origin", which is…, Fail-safe direction, asserted explicitly because getting it backwards is…, The flag only ever explains a MISSING origin. A stale True on a row that later…, The exact lie the Behavior Contract exists to prevent: a couldn't-run case…, AC-3 perf: precomputing a room bbox and using it to pre-reject candidates must…, The engine's determinate outcomes must all have a RoomStatus. A new engine… (+26 more)

### Community 258 - "test_health_shared_state_readiness.py"
Cohesion: 0.10
Nodes (31): _fresh_store(), _health(), fixture, parametrize, Wave 2 O5: /health must not report ready while the configured shared-state…, A hung Redis answers 503 inside BIMPOSSIBLE_HEALTH_REDIS_TIMEOUT_SECONDS, not…, The bound is asyncio-level: a client whose own timeouts misbehave cannot hold…, REDIS_URL is only a connection string: with the backend unset, /health never… (+23 more)

### Community 259 - "budget_reservation.py"
Cohesion: 0.14
Nodes (32): expire_stale(), _expire_stale_locked(), extend(), _finalize(), finalize_in_background(), _now(), datetime, Exception (+24 more)

### Community 260 - "build_native_circuit_rows"
Cohesion: 0.14
Nodes (32): Panel section suffix ("(SEC 2)") from the first non-empty candidate key,…, section_suffix(), build_native_circuit_rows(), _format_breaker_amps(), Native circuit rows from the AEC DM `Electrical Circuits` category (Wave…, Compose '20A' or '20/3P' style label., Return one row per Electrical Circuits element, joined to its panel. Args:…, _circuit() (+24 more)

### Community 261 - "get_element_group_at_tip"
Cohesion: 0.09
Nodes (28): get_element_group_at_tip(), Returns { elementGroupId: str, versionNumber: int } for the tip of the file.…, key_tip(), test_tip_force_refresh_invalidates_persist_and_reprobes(), test_tip_served_from_persist_without_upstream(), _drain_revalidations(), fake_persist(), FakeStore (+20 more)

### Community 262 - "service.py"
Cohesion: 0.11
Nodes (33): _delete_document_products(), _id_chunks(), ingest_document(), live_docs(), lock_document_jobs(), new_doc_id(), _now(), purge_due_documents() (+25 more)

### Community 263 - "lifecycle_dispatch.py"
Cohesion: 0.11
Nodes (28): classify_transport_failure(), _deliver_one(), DeliveryRecord, dispatch_pending(), DispatchReport, _log_summary(), NoRoutes, NotificationTransport (+20 more)

### Community 264 - "test_preflight_user_roles.py"
Cohesion: 0.13
Nodes (25): Read-only production-readiness preflight checks (W5). Entry points *…, run_checks(), Finding, main_for(), PreflightResult, Result types and the shared CLI runner for ``aec.preflight`` checks., Open a connection from ``db.session.engine``, run ``checks``, print JSON,…, check_user_roles_firm_scoped() (+17 more)

### Community 265 - "if_none_match_matches"
Cohesion: 0.10
Nodes (31): Weak ETag for a /data/relationships response (Session 3, perf-diagnostic…, _relationships_etag(), C-DerivCache D1 — shared conditional-GET helpers (utils/http_caching.py).…, test_exact_quoted_match(), test_format_etag_strong(), test_format_etag_weak(), test_matches_when_etag_value_is_itself_weak_formatted(), test_matches_within_a_comma_separated_list() (+23 more)

### Community 266 - "run_matrix.py"
Cohesion: 0.08
Nodes (29): Mode, all_node_ids(), The Wave 5 production-simulation matrix: one row per mandate item. Each row…, One mandate item and the assertions that discharge it., Every pytest node id the matrix depends on, de-duplicated, order preserved., Row, rows_by_mode(), main() (+21 more)

### Community 267 - "test_relay_boundary.py"
Cohesion: 0.09
Nodes (18): _adapter_relay_methods(), _FakeRequest, _header(), _load_relay(), parametrize, Relay boundary tests (2026-08-24 weekly audit RE-1). test_phase1_safety.py…, Just enough of web.Request for handle_rpc: headers, remote, async json()., SEC-L5: the relay must never forward a method outside the allowlist. (+10 more)

### Community 268 - "test_sim_artifacts_autodesk_first.py"
Cohesion: 0.09
Nodes (26): _client(), _FakeSession, layer1(), fixture, Wave 5 SIM gap — the Track-2 artifact read surface under…, Inject the Layer-1 (own Autodesk entitlement) verdict, per project., Flag off: both reads serve on the firm's hub grant alone and Autodesk is never…, Flag on, hub granted, audience matched, guard serving — and still 404 when the… (+18 more)

### Community 269 - "test_wave7_automation.py"
Cohesion: 0.07
Nodes (22): _make_share_link(), _mock_db_no_mv(), _mock_db_returns_mv(), Wave 7 — Phase 3.9 automation: pure unit tests. Covers the three user-trust…, ModelVersion present → cached_at is returned as ISO string., The element count sub-query is executed after the ModelVersion lookup., The 5,000-element gate is a cross-layer contract (frontend gate + this doc…, Simulates the frontend predicate: blocked iff fields AND count > 5k. (+14 more)

### Community 270 - "_Request"
Cohesion: 0.20
Nodes (31): Protocol, _Request, _Response, _as_user(), _bearer(), control(), _control_ok(), _deny() (+23 more)

### Community 271 - "test_autodesk_first_workers.py"
Cohesion: 0.09
Nodes (27): _classify(), _load_script(), _narrow_actor(), Exception, _raise_sentinel(), B6 — background work under the Autodesk-first actor model (DB lane). Real…, W5 P1F3 item 3: flag on, the plannable-hub 403 is the shared hub deny detail…, Keep the actor registered but without the operation under test. (+19 more)

### Community 272 - "test_change_set_router_type_target.py"
Cohesion: 0.16
Nodes (32): _approved_type_set(), _as_user(), _cleanup(), _create_draft(), _drop_batch(), _firm(), _member(), parametrize (+24 more)

### Community 273 - "test_login_firm_autolink.py"
Cohesion: 0.14
Nodes (30): _cleanup(), _fake_client_factory(), _FakeResp, _firm_with_domain(), _login_then_callback(), _memberships(), _oauth_env(), Firm (+22 more)

### Community 274 - "build_plan"
Cohesion: 0.13
Nodes (13): PlannerTests, ProjectSetupInput, Pure-lane tests for the Phase 8 Project Setup Wizard no-write core. Stdlib…, _valid_input(), build_plan(), ProjectSetupInput, ProvisioningPlan, Provisioning planner for the Project Setup Wizard (§4/§11 of the build spec).… (+5 more)

### Community 275 - "test_authz_reconcile.py"
Cohesion: 0.10
Nodes (24): timedelta, Summarize projection rows for a scope. ``rows`` is ``(sync_state, synced_at)``…, summarize_projection_health(), past_sla(), Any, datetime, timedelta, Freshness reconciliation for the permission projection (plan v3 §7a.3 / §7b.9).… (+16 more)

### Community 276 - "test_authz_membership_backfill.py"
Cohesion: 0.13
Nodes (27): apply_backfill(), BackfillApplyResult, MemberFact, plan_membership_backfill(), ProjectResources, Any, datetime, timedelta (+19 more)

### Community 277 - "lifecycle_messages.py"
Cohesion: 0.10
Nodes (28): idempotency_key_for_history(), Deterministic receiver-facing dedup key: one transition row, one key, however…, _locked_ledger_row(), The (event, provider) ledger row, created if absent, row-locked until the…, build_message(), delivery_key(), DispatchableEvent, _metadata_is_current() (+20 more)

### Community 278 - "test_geometry_decode.py"
Cohesion: 0.13
Nodes (30): _chain_segments(), footprint_area(), _next_record_start(), parse_sab(), _points_match(), Point2D, SAB (ACIS binary) tokenizer + planar room-footprint extractor. Reverse-…, Extracts the room's bottom horizontal planar face as closed 2D polygon loops.… (+22 more)

### Community 279 - "readiness.py"
Cohesion: 0.08
Nodes (21): ConfigVarStatus, IntegrationConfigReport, log_integration_config_readiness(), Redacted readiness for one kind. Holds names and codes only. `checked` is False…, The redacted report for a check that could not complete: no statuses,…, Emit one structured WARNING per non-OK variable (name + code only) and return…, unchecked_report(), IntegrationReadiness (+13 more)

### Community 280 - "test_structural_framing_schedule.py"
Cohesion: 0.14
Nodes (30): assemble_structural_framing_schedule(), build_structural_framing_rows(), _framing_section_summaries(), _name_of(), Structural Framing (Beam) schedule shaping (Wave 13 — Structural). Pure-Python…, Top-level shaper: instance-grain rows + totals (framing_count + by_section…, Display name: the element's type name, falling back to 'familyName · typeName'…, First section candidate that is real. Revit's "NotDefined" Section Shape enum… (+22 more)

### Community 281 - "onboarding_router.py"
Cohesion: 0.14
Nodes (31): _client_ip(), DnsInstruction, _map(), MeOut, onboarding_get(), onboarding_me(), onboarding_rotate(), onboarding_start() (+23 more)

### Community 282 - "test_admin_integration_readiness.py"
Cohesion: 0.17
Nodes (26): _all_env_names(), _assert_no_leak(), _auth_db(), _client(), _enable(), _gate_client(), _kinds(), parametrize (+18 more)

### Community 283 - "test_phase9_product_review_router.py"
Cohesion: 0.12
Nodes (27): _client(), env(), _PgError, _product(), Exception, fixture, parametrize, Phase 9 review router (aec/product_review_router.py) — DB lane, real session.… (+19 more)

### Community 284 - "fetch_ops_metrics"
Cohesion: 0.10
Nodes (19): AuthzOpsMetrics, fetch_ops_metrics(), datetime, timedelta, DB glue for the Authorization-Inheritance ops-metrics view (plan v3 §7b.9). The…, Aggregate the decision stream + break-glass table into an…, Point-in-time operational snapshot for the founder/admin authz ops view., Overall green: projection healthy AND no staleness denials AND no badge… (+11 more)

### Community 285 - "fetch_shadow_observation"
Cohesion: 0.14
Nodes (27): fetch_shadow_observation(), datetime, timedelta, DB glue for the shadow-mode observation window (plan v3 §7b.1). The math is…, Aggregate the SHADOW-mode would-deny stream into a :class:`ShadowObservation`…, Pure tests for the shadow-window aggregate assembly…, review #5: share-derived allows must be visible for the ENFORCE flip WITHOUT…, review pass-2 #7: a SHADOW share allow is a counterfactual (the read was served… (+19 more)

### Community 286 - "test_db_safety.py"
Cohesion: 0.12
Nodes (29): assert_safe_test_db(), db_name_from_url(), is_production_db(), Shared test-DB safety guard (Layer 2). One place that answers: *is it safe to…, Return the database name (last path segment) from a SQLAlchemy URL., True if `url` names a known production database., Raise RuntimeError if `url` names a production database. Fail-open by design:…, Resolve the database URL the TEST suite should use, and assert it is safe.… (+21 more)

### Community 287 - "test_membership_gate.py"
Cohesion: 0.13
Nodes (21): MintSyncTokenRequest, _body(), _clear_flags(), _clear_revit_link_cache(), _deny_membership(), _fresh_router(), fixture, PR A (2026-08-06 tenancy triage) — /revit membership-gate denial coverage. Gap… (+13 more)

### Community 288 - "seed_world"
Cohesion: 0.18
Nodes (29): _audits(), conn(), fixture, W5 ROLES — migration aadf3ce41b1c (user_roles primary key -> (user_uuid,…, lock_timeout: a live transaction holding user_roles makes backend-migrate fail…, test_composite_key_in_the_wrong_column_order_is_not_accepted(), test_downgrade_refuses_multi_firm_users_then_restores_and_re_upgrades(), test_second_upgrade_is_a_no_op() (+21 more)

### Community 289 - "_FakeSession"
Cohesion: 0.08
Nodes (10): _FakeIntegrityError, _FakeQuery, _FakeSavepoint, _FakeSession, Exception, Phase 4 regression tests: cache.py upsert loop transaction integrity.…, Behavioural: an IntegrityError raised inside a begin_nested() savepoint is…, Minimal session simulator tracking adds, commits, and rollbacks. (+2 more)

### Community 290 - "production_posture.py"
Cohesion: 0.09
Nodes (27): test_aps_callback_rules(), test_d6_ambiguous_posture_arms_guards(), test_d6_env_diagnostic_names_variable_and_accepted_value_without_echo(), test_posture_reason_never_echoes_an_unrecognised_value(), ApsConfigError, check_aps_config(), ConfigIssue, crypto_key_material_problems() (+19 more)

### Community 291 - "_clear_firm_hub_grants"
Cohesion: 0.08
Nodes (26): _clear_firm_hub_grants(), _grant_firm_hub(), Pins the auth half of the route's tenancy-invariant EXEMPT rationale…, Seed a FirmAllowedHub grant so allowed_hubs_for(db, firm_id) is non-empty., b.hub-xyz is on the global allowlist, but the caller's firm only holds a…, 2026-09-16 discovery (Track D #1): POST /wizard/plan omitted firm_scoped, so…, Bootstrap preserved: single-tenant + zero grants keeps global-allowlist-only…, b.hub-xyz is globally allowlisted, but the caller's firm holds only a DIFFERENT… (+18 more)

### Community 292 - "test_architectural_window_schedule.py"
Cohesion: 0.16
Nodes (28): assemble_architectural_window_schedule(), build_architectural_window_rows(), Architectural Window schedule shaping (Wave 10). Pure-Python — no…, One row per window element. Sorted by Mark (numeric if possible, then alpha).…, Count + total glazing area (width*height, m2) per window type. A window missing…, Top-level shaper: instance-grain window rows + totals (window_count + by_type).…, _window_sort_key(), _window_type_summaries() (+20 more)

### Community 293 - "test_assistant_context.py"
Cohesion: 0.11
Nodes (21): format_project_context(), datetime, Compact human recency: 'just now' / 'N minutes ago' / 'N hours ago' / 'N days…, Build the auto-derived project briefing paragraph from already-fetched facts.…, _relative(), _cats(), _Ctx, Phase 4d Lever 2 (Better Context): the project-context grounding builder. These… (+13 more)

### Community 294 - "assistant_write_tools.py"
Cohesion: 0.11
Nodes (26): delete_saved_view(), _deny(), _get_view(), _label(), _log_action(), log_cancelled_action(), Any, UUID (+18 more)

### Community 295 - "test_change_set_apply_boundary.py"
Cohesion: 0.11
Nodes (26): EditLogBody, EditLogOutcome, One Apply run's outcomes for ONE change set. batch_id is the run GUID the add-…, One staged edit's outcome from a T4 Apply run. The client names the staged edit…, field_validator, _approved_two_edit_set(), _as(), _in_review_two_edit_set() (+18 more)

### Community 296 - "exports.py"
Cohesion: 0.13
Nodes (27): _period_start(), Start of the budget window in UTC: the first instant of the calendar month…, cost_pdf(), _csv_safe(), firms_csv(), models_cost_rows(), projects_breakdown_rows(), projects_csv() (+19 more)

### Community 297 - "test_stale_sweep_worker.py"
Cohesion: 0.10
Nodes (27): Split an over-long section on blank lines, never mid-paragraph. Returns (text,…, _split_long(), LogRecord, _capture_worker_log(), _cleanup(), _ListHandler, _naive_utc_hours_ago(), datetime (+19 more)

### Community 298 - "test_effective_access_migration.py"
Cohesion: 0.15
Nodes (29): effective_project_access(), Resolve the firm's live hub grants + enrollments into one access map. While…, _enroll(), _grant(), _other_firm(), UUID, Hub-grant migration (2026-08-16) — effective_project_access + /search/models.…, Byte-compat with the hub-only decision while enrollment mode is OFF. (+21 more)

### Community 299 - "re"
Cohesion: 0.10
Nodes (25): __getattr__(), Any, Phase 17.0 — Integration Control Plane (foundation slice). The reusable…, importlib, re, _contracts(), parametrize, Phase 17 configuration governance: `.env.example` <-> declared contract. Code-… (+17 more)

### Community 300 - "test_issues_join_probe.py"
Cohesion: 0.14
Nodes (28): extract_pushpin_targets(), Pull every identity candidate a pushpin carries, tagged by source field.…, _probe(), _bind_probe_modules(), _FakeDB, _pushpin_issue(), fixture, Unit tests for the R1 read-only issue join probe (aec/issues_client +… (+20 more)

### Community 301 - "live_filter.py"
Cohesion: 0.10
Nodes (29): charge_page_or_raise(), _fetch_bounded(), filter_tree_to_fiql(), _leaf_to_fiql(), live_filter_enabled(), _log_fallback(), _max_pages(), MeterExhausted (+21 more)

### Community 302 - "encrypt_blob"
Cohesion: 0.14
Nodes (28): mint_proxy_viewer_token(), Opaque proxy-viewer bearer token (PDP G1 defect #4, 2026-08-23; bound W4 C2,…, Wrap the caller's own sid for SDK bearer use, bound to ``(project_id,…, Recover the sid from a proxy-viewer bearer for a request addressing…, resolve_proxy_viewer_sid(), _valid_id(), encrypt_blob(), Encrypt an arbitrary non-empty string for at-rest storage with the PRIMARY… (+20 more)

### Community 303 - "router"
Cohesion: 0.10
Nodes (24): _clear_caches(), _on(), _cur(), fixture, W5 P1F4 item 1 — the per-user APS content caches are bounded and never poisoned…, Unbounded was the finding: each of the four content caches carries the cap., Belt and braces: even with a readable-but-churning generation the cache is…, Stand-in autodesk-first session for ``af.content_cache_scope``. (+16 more)

### Community 304 - "_stub_live_read"
Cohesion: 0.11
Nodes (27): _post_live(), Stub auth + Phase 6 seams + the model turn so the live-read resume runs without…, POST a raw JSON body (bytes) so malformed/oversized payloads are testable — the…, Sixth call site (E): an ACTIVE-but-undecryptable firm key denies with…, Ticket seeded under the paired pane's sid; a session presenting a different sid…, Expired parent session / TTL lapse: the pop returns None -> 404. Patch the pop…, A used request_id cannot be replayed: the first resume pops the ticket, the…, The per-firm budget is re-checked BEFORE the single-use pop, so an over-budget… (+19 more)

### Community 306 - "_Client"
Cohesion: 0.07
Nodes (23): _client(), _AdminResponse, _DuplicateResponse, flag_off(), _fresh_store(), _number_check_upstream(), _client(), fixture (+15 more)

### Community 307 - "test_pdp_g1_proxy_router.py"
Cohesion: 0.09
Nodes (20): _badge_recorder(), _project_access(), fixture, parametrize, PDP G1 (2026-08-23) — router-level pins: streaming render + viewer-token…, Stub the mint-time project-access proof; records calls, denies projects in…, _signed_in(), _Stream (+12 more)

### Community 308 - "lifespan"
Cohesion: 0.09
Nodes (28): stop(), stop(), Lifespan shutdown hook: signal + cancel + await both loops. Idempotent no-op if…, stop(), close_aec_client(), Close the shared AEC DM httpx client during lifespan shutdown., Lifespan shutdown hook: signal + cancel + await the worker pool., stop() (+20 more)

### Community 309 - "test_assistant_thinking.py"
Cohesion: 0.15
Nodes (24): _block_to_dict(), True when the question looks complex enough to warrant extended thinking., One Anthropic SDK content block -> a JSON-safe dict; None for unknown types.…, _should_use_extended_thinking(), _Block, _collect(), _ctx(), FakeClient (+16 more)

### Community 310 - "usage_logger.py"
Cohesion: 0.10
Nodes (27): A continuation failed after its hold was taken but before its stream was handed…, Push the hold's TTL forward, awaiting the outcome (AIS-RE-2 fail-closed).…, Finalize the hold when the stream ends, however it ends. Settlement is queued…, _release_pre_stream(), _renew_hold(), _with_reservation(), _renew_loop(), _bump() (+19 more)

### Community 311 - "test_identity_link_login.py"
Cohesion: 0.13
Nodes (25): attach_on_login(), authproof_from_verified_claims(), identity_link_enabled(), Any, datetime, Login-time identity linking — turn a verified Autodesk id-token into an…, Dark-by-default flag for login-time identity linking (default OFF)., Build an Autodesk :class:`AuthProof` from ALREADY-VERIFIED id-token claims. The… (+17 more)

### Community 312 - "resolve_project_rules"
Cohesion: 0.18
Nodes (26): Canonical name for `name` (identity for canonical names)., Session, REGISTRY + the project's .ids-imported rules, with project overrides applied…, resolve_project_rules(), _NoDB, Phase 11 — resolve_project_rules: the single source of truth for the effective…, Stub the two DB loaders in the resolve namespace. Returns a dict capturing the…, _rule() (+18 more)

### Community 313 - "test_spec_render.py"
Cohesion: 0.16
Nodes (27): _coverage_line(), _esc(), Any, BIMpossible — Spec Draft Renderers (Wave 4.10) Turns the structured draft from…, Render the draft as a self-contained HTML document (Word-openable)., Render the draft as Markdown for the in-app preview., render_html(), render_markdown() (+19 more)

### Community 314 - "_prod_posture"
Cohesion: 0.14
Nodes (27): _check_crypto_keys(), _check_secret_key(), _prod_posture(), AST-H1 / INFRA-M2: the at-rest ciphers derive their Fernet key from a dedicated…, Production posture, DECOUPLED from TLS termination (INFRA-M2, 2026-07-01…, SEC-H3: refuse to boot with a weak/default SECRET_KEY under prod posture.…, _clear(), AST-H1 / INFRA-M2 (2026-07-01 audit): the boot guard refuses EMPTY at-rest… (+19 more)

### Community 315 - "sync_token.py"
Cohesion: 0.12
Nodes (28): _b64decode(), _b64encode(), _burn(), mint(), _prune_locked(), Exception, revit_link/sync_token.py — one-time elevated SyncWithCentral authorization…, The token is valid but was minted for a different firm/user/document than the… (+20 more)

### Community 316 - "test_pdp_g1_proxy_tenancy.py"
Cohesion: 0.12
Nodes (24): _all_kinds(), _never_probe(), fixture, PDP G1 (2026-08-23) — derivative proxy under the REAL tenancy gate (no…, Project B is owned by another firm and shared (view-only by default) with the…, Two projects in two hubs, each with one model. The caller's firm (static test…, _rows(), _set_scope() (+16 more)

### Community 317 - "test_native_adapter_aec9.py"
Cohesion: 0.11
Nodes (25): _client_factory(), _FakeResponse, parametrize, WriteInstanceParameterRequest, AEC-9 — relay transport hardening + honest edit-log status. _call_relay used to…, RemoteProtocolError (connection died mid-response) is neither a ConnectError…, Drive write_instance_parameter into the failure finally-block with a…, AEC-9: on TIMEOUT the write may have committed in Revit after we stopped… (+17 more)

### Community 318 - "_Block"
Cohesion: 0.20
Nodes (25): _Block, _FakeClient, _msg(), The hop is served with the ORIGINAL BYOK credential (correction D) — the…, Loop-level half of the cross-model pin: the rebuilt conversation (thinking…, A channel-kind resolution pinned to `model_id` (channel kinds honour an…, A refusal is a content decision, not an availability failure: no hop, no retry,…, _res() (+17 more)

### Community 319 - "test_auth_identity_exemptions.py"
Cohesion: 0.08
Nodes (25): _authed_client(), _clean_env(), fixture, Behavior pins for the six auth/identity EXEMPT routes (PR 1, 2026-08-06).…, The half of the exemption reason that actually carries tenancy risk: "when…, C-5: an anonymous probe must get the backend's identity — and ONLY its…, The exemption reasons that caller-identity scope is NARROWER than firm scope:…, An authenticated session can carry no Autodesk id (the APS userinfo call at… (+17 more)

### Community 320 - "test_qa_migrations_idempotent.py"
Cohesion: 0.16
Nodes (27): _load(), parametrize, TST-3 — the new table-creating migrations are idempotent. Each guards…, The two gateways land in sequence, not as two alembic heads. A branched…, Invoke upgrade() with a mocked op + inspector reporting the given CHECK-…, Invoke upgrade() with a mocked op + inspector reporting the given DB state., Each table is guarded independently, so a half-built DB completes rather than…, _run_ck_upgrade() (+19 more)

### Community 321 - "test_service_badge.py"
Cohesion: 0.14
Nodes (25): BadgeUseClass, classify_badge_use(), detect_anomalous_badge_volume(), _norm(), datetime, Pure core for Service-Account (badge) log-distinctness + anomalous-use…, Verdict for a single badge use. ``known`` is False for any unrecognized/blank…, Classify one Service-Account badge use. A recognized job in… (+17 more)

### Community 322 - "cross_model_join.py"
Cohesion: 0.16
Nodes (26): _as_region(), _blank_door_result(), EquipmentInput, _group_rooms_by_band(), LinkedDoorRoomsResult, LinkedRoomResult, _most_common_phase(), _nearest_band() (+18 more)

### Community 323 - "test_model_index_discovery.py"
Cohesion: 0.13
Nodes (25): index_discovered_models(), Session, Discovery-time model_index stubs — make every Files-view RVT searchable.…, Idempotently upsert stub model_index rows for an all-rvts listing, then…, Discovery-time model_index stubs (aec.model_index_sync) — the all-rvts →…, Stubs (and only stubs) track ACC renames, and carry the epoch sentinel so they…, A lineage present in one discovery run and absent from the next (APS…, A tombstoned row whose lineage shows back up in a later discovery run is un-… (+17 more)

### Community 324 - "prewarm_worker.py"
Cohesion: 0.10
Nodes (26): _is_auth_missing(), _is_rate_limited(), _log_pairing_block(), _persisted_error(), BaseException, Event, OD2 Phase 4.2 — app-owned background pre-warm worker. A small pool of in-…, One structured demand-evidence line per blocked ATTEMPT (the queue is at-least-… (+18 more)

### Community 325 - "test_elements_etag.py"
Cohesion: 0.15
Nodes (25): _apply_sort(), _key(), _elements_etag(), _get_field_value(), Return a string value for a field from an element dict., Weak ETag for a /data/elements response (Wave 4.6.5 #3). Within a model version…, _els(), Wave 4.6.5 #3 — unit tests for the /data/elements ETag helper. The conditional-… (+17 more)

### Community 326 - "test_entrypoint_firm_docs.py"
Cohesion: 0.12
Nodes (25): requires_root, requires_sh, _code_lines(), Tests for the firm-docs volume-prep entrypoint scripts. Two layers: *…, Ordinary startup must not `chown -R` the whole firm-docs corpus., The bounded recursive repair is opt-in and operator-run, not on boot., A root that cannot be created (parent is a regular file) must abort with a…, As root: the configured owner is applied to the root, and pre-existing children… (+17 more)

### Community 327 - "test_auth_login_state.py"
Cohesion: 0.16
Nodes (25): _client(), happy_token_exchange(), _mints_session_cookie(), _oauth_env(), fixture, AUTH-3 (2026-07-22) — the OAuth state binding must survive real login behavior.…, AUTH-4 regression: the login redirect MUST carry prompt=login. Without it,…, AUTH-5 (2026-08-08) REVERSES the earlier retry-path invariant. Earlier (AUTH-4)… (+17 more)

### Community 328 - "test_change_set_list_and_discard.py"
Cohesion: 0.15
Nodes (25): _as_user(), _cleanup(), _draft(), _firm(), firm_user(), _member(), fixture, parametrize (+17 more)

### Community 329 - "test_firm_docs_routes_dblane.py"
Cohesion: 0.25
Nodes (25): _as(), _cleanup(), _docs_root(), _firm(), _member(), fixture, DB-lane API tests for /firm-docs (Pillar 2). Requires the test DB — run via the…, 2026-09-16 sweep 4: extraction succeeded but writing text/ (or rebuilding the… (+17 more)

### Community 330 - "test_personal_assistant_endpoint.py"
Cohesion: 0.13
Nodes (25): _client(), Model routing slice 4 — /assistant/personal router, fastapi lane. Run with…, Flag-off must look identical to anonymous and signed-in callers: the identity…, UsageEvent stand-in carrying only the columns the wire mapper reads., Anonymous callers get the identity denial, never a 422 that reveals the…, Slice 6: the scope gate is the first check after identity, so a forger cannot…, _Row, test_create_conversation_rejects_firm_scope_body() (+17 more)

### Community 331 - "_human_summary"
Cohesion: 0.13
Nodes (20): _count_conditions(), _describe_update(), _element_label(), _human_summary(), AST-M6 (2026-07-01 audit): model-supplied filters were persisted UNVALIDATED…, Render the NEW values an update will apply (AST-M6). The approver previously…, The element's human name for the approval dialog, taken from the selection…, Concise human-readable description of the pending write action. AST-M6: for the… (+12 more)

### Community 332 - "seed_project"
Cohesion: 0.13
Nodes (22): AclSource, What the seed service depends on: fetch one project's raw ACL. Implementations…, AuthzSeedDisabled, Any, datetime, RuntimeError, timedelta, Top-level projection seed orchestration (plan v3 §5 / §7a.1) — the entry a… (+14 more)

### Community 333 - "test_artifacts_provenance.py"
Cohesion: 0.14
Nodes (18): _is_genuine_source(), Session, Server-side provenance validation for Track-2 published-artifact source sets…, Raised when one or more declared sources fail server-side provenance…, True iff ``item_urn`` is a lineage item known to the server for exactly this…, Return the canonical, deduplicated, sorted list of validated source item-URNs…, SourceProvenanceError, validate_source_provenance() (+10 more)

### Community 334 - "test_shadow_window.py"
Cohesion: 0.11
Nodes (20): assemble_shadow_observation(), datetime, timedelta, Shadow-mode observation window (plan v3 §7b.1 / DoD #13) — the pure derivation.…, True once the recorded shadow span reaches the §7b.1 target. Fail-closed: no…, True while any shadow denial exists that a human has not yet cleared as a true…, Assemble already-fetched shadow-stream aggregates into the immutable…, Point-in-time summary of the SHADOW-mode would-deny stream for the release-gate… (+12 more)

### Community 335 - "compute_cost"
Cohesion: 0.15
Nodes (22): compute_cost(), PricingNotFoundError, LookupError, Session, DB-backed, reproducible cost computation. INVARIANT: never returns a silent $0…, No model_pricing row matched the requested model + date., resolve_pricing(), date (+14 more)

### Community 336 - "test_lifecycle_dispatch_pure.py"
Cohesion: 0.13
Nodes (22): gate_outcome(), Firm-level eligibility of one provider, before any event is touched. A route…, _event(), _Exploding, _NoCallResolver, parametrize, Pure-lane tests for the dormant lifecycle-notification seam (Phase 17). Covers…, _row() (+14 more)

### Community 337 - "test_interiors_furniture_schedule.py"
Cohesion: 0.17
Nodes (24): assemble_interiors_furniture_schedule(), build_interiors_furniture_rows(), _furniture_level_summaries(), _furniture_sort_key(), Interiors Furniture schedule shaping (Wave 16). Pure-Python — no…, One row per furniture element. Sorted by Mark (numeric if possible, then…, Furniture count per Level (unleveled furniture bucketed under '(no level)')., Top-level shaper: instance-grain furniture rows + totals (furniture_count +… (+16 more)

### Community 338 - "product_bindings_router.py"
Cohesion: 0.16
Nodes (25): _audit(), bind_product_to_element(), BindBody, BindingListOut, BindingOut, _counts_out(), CountsOut, _hub_for() (+17 more)

### Community 339 - "ProjectConfig"
Cohesion: 0.14
Nodes (22): get_assistant_mode(), Return the assistant mode for *project_id*. 'none' → block with 403 'help_only'…, ProjectConfig, Per-project assistant access tier (Phase 6 / access billing). assistant_mode…, _client(), Phase 6 / access tiers: project_configs + assistant mode routing tests. Pure…, Stub all auth + Phase 6 gateway seams so each test focuses on one concern., help_only mode must pass HELP_ONLY_TOOLS (just search_help) to run_agent_turn. (+14 more)

### Community 340 - "test_schedule_endpoints_preparing.py"
Cohesion: 0.18
Nodes (25): get_electrical_equipment_schedule(), get_transformer_schedule(), prepare() for the transformer schedule: Electrical Equipment whose familyName…, Instance-grain electrical equipment schedule for the model's Electrical…, Transformer schedule — instance-grain schedule for the model's transformer-…, _transformer_equipment(), _call_circuits(), _call_element_by_uid() (+17 more)

### Community 341 - "manifest.template.json"
Cohesion: 0.08
Nodes (25): identity, messageTeamMembers, REPLACE_WITH_YOUR_HOST, accentColor, bots, description, full, short (+17 more)

### Community 342 - "TestRelayFrameGuard"
Cohesion: 0.13
Nodes (10): _BufferPipe, _HeaderOnlyPipe, relay._check_auth() must enforce X-Relay-Token., relay._read_frame() must reject corrupt length prefixes. RevitLink framing…, A 4-byte signed-int32 LE length prefix, exactly as the C# side writes., Serves exactly the 4-byte header, then fails if asked for more — so a body read…, Serves a full preset buffer (header + body) sequentially via .read(n)., Guard against a careless '<i' -> '<I' swap. The C# writer emits a signed Int32,… (+2 more)

### Community 343 - "test_autodesk_first_d1b_revert_gate.py"
Cohesion: 0.16
Nodes (25): _client(), parametrize, TestClient, W6 D1b: the assistant ``parameter-writes/{id}/revert(-preview)`` routes under…, Flag off: membership + role only, straight to the proposal lookup. project_id…, W9-INV-088: one cold Layer-1 evaluation per request; the D1 capability re-read…, Entitlement is a ceiling, never a grant: with Autodesk saying yes, a firm-side…, Firm side allows; the caller's own Autodesk access to the project is gone ->… (+17 more)

### Community 344 - "test_get_user_token_refresh.py"
Cohesion: 0.18
Nodes (21): _auth(), _cleanup(), _creds(), _error_client(), _ExplodingClient, _ok_client(), fixture, parametrize (+13 more)

### Community 345 - "test_migration_phase9_firm_owned_bindings.py"
Cohesion: 0.21
Nodes (25): _apply(), _inspector(), _load(), _lock_then_count(), db_lane, Phase 9 migration b4d7e2f9c1a3 — firm-owned bindings + hub-global products.…, (statement, kind) in call order: op.execute LOCKs vs bind.execute counts., _run() (+17 more)

### Community 346 - "test_migration_phase9_product_identity_integrity.py"
Cohesion: 0.22
Nodes (25): _apply(), _count(), _insert(), _inspector(), _load(), db_lane, Phase 9 migration e6b2d8f1a9c3 — product identity integrity (owner policy 3).…, On top of a7d3f9c2e5b8: a purge deletes the document's own products, while a… (+17 more)

### Community 347 - "test_nl_filter_ai_context_policy.py"
Cohesion: 0.14
Nodes (18): _assert_nothing_spent(), _call(), _FirmKeyedSession, BaseException, parametrize, POST /data/nl_filter under the project AI context policy (owner ruling on #661…, SLOP-1 (WFA 2026-09-14): a policy-store failure is STILL denied before any…, SEC-1: the policy is keyed (firm_id, project_id). A caller passing… (+10 more)

### Community 348 - "test_w7_redaction.py"
Cohesion: 0.13
Nodes (18): _all_text(), _assert_clean(), captured(), _Db, _fake_aps(), _fresh(), fixture, parametrize (+10 more)

### Community 349 - "test_geometry_fetch.py"
Cohesion: 0.14
Nodes (18): fetch_room_geometry(), Batched geometryDataByElements + immediate ranged GET per batch, returned keyed…, _async_return(), _FakeAsyncClient, _FakeResponse, _id_map_page(), Phase 3.10a — geometry_fetch tests. Mocks the two I/O boundaries this module…, An elementsByElementGroup response shaped like _ID_MAP_PAGE_QUERY /… (+10 more)

### Community 350 - "test_nl_filter_grounding.py"
Cohesion: 0.13
Nodes (22): _build_known_values_block(), _build_system_prompt(), field_validator, Clamp caller-supplied grounding to safe sizes before it reaches the prompt., Render the grounded-value section, honoring only allowed, non-empty columns.…, Clamp a caller-supplied grounding map to safe sizes. This is the security/cost…, sanitize_column_values(), Tests for the NL-filter grounded value vocabulary (aec.nl_filter). WHY THIS… (+14 more)

### Community 351 - "build_structural_column_rows"
Cohesion: 0.19
Nodes (23): assemble_structural_column_schedule(), build_structural_column_rows(), _name_of(), Structural Column schedule shaping (Wave 13 — Structural). Pure-Python — no…, First section candidate that is real; skips Revit's NotDefined sentinel., One row per column element, sorted by name (case-insensitive). elevation_m is…, _section_of(), _col() (+15 more)

### Community 352 - "test_nl_filter_rate_limit.py"
Cohesion: 0.11
Nodes (20): aps_unset(), fixture, parametrize, Wave 3 posture: a missing APS OAuth variable used to surface as a bare KeyError…, The secret is only used at the callback exchange; without this check a user…, test_aps_setting_refuses_missing_or_blank_with_a_named_503(), test_aps_setting_returns_the_value(), test_basic_header_names_the_missing_secret_without_echoing_the_id() (+12 more)

### Community 353 - "parametrize"
Cohesion: 0.12
Nodes (23): _assert_no_secrets(), _bind_project_hub(), _boom(), project_hub_binding(), parametrize, BIMpossible's own verified project->hub binding for _P (the chat gates are…, W6 D1b: Autodesk says yes, membership + capability hold for the Autodesk-proven…, The D1 violation itself: Autodesk confirms the user (and the Layer-1 check… (+15 more)

### Community 354 - "test_help_wave4_discoverability.py"
Cohesion: 0.15
Nodes (23): Discoverability tests for the Wave 4 long-tail help articles. Each new article…, test_account_usage_identifier_style(), test_account_usage_natural_language(), test_calculated_fields_identifier_style(), test_calculated_fields_natural_language(), test_element_details_identifier_style(), test_element_details_natural_language(), test_element_groups_identifier_style() (+15 more)

### Community 355 - "TestMigrationFile"
Cohesion: 0.08
Nodes (9): Phase 3.5 schema migration regression tests. Validates source-level evidence…, Migration SQL must exist, drop NOT NULL, add CHECK, create 3 indexes., ORM `category_key` must be declared nullable for kind='group' rows., ORM must mirror the DB-side per-kind CHECK constraint by name + expression., Three partial-unique-indexes for groups must be declared on the ORM., TestMigrationFile, TestOrmGroupUniquenessIndexes, TestOrmNullability (+1 more)

### Community 356 - "test_wizard_consent_identity.py"
Cohesion: 0.10
Nodes (18): _complete_consent_as(), _consent_env(), _FakeAsyncClient, _FakeResponse, SEC-WIZ-CONSENT-1 (2026-07-27 weekly audit) — the wizard's elevated-consent…, THE regression. User B finishing user A's consent must not leave a write-scoped…, Fail-closed: unlike login (which may degrade to an unlinked session), a write-…, Happy path must survive the fix — this is the wizard's live Autodesk write… (+10 more)

### Community 357 - "test_xlsx_export.py"
Cohesion: 0.14
Nodes (22): _patch_cold(), _patch_token(), _fake(), _patch_warm(), Wave 5 — XLSX export: unit + endpoint contract tests. TDD order: all tests…, The canonical placeholder family must never appear in an export, mirroring the…, item_grain=type collapses instances sharing (familyName, typeName) into one…, OmniClass/CSI fallback enrichment parity with GET /elements (router.py ~L564) —… (+14 more)

### Community 358 - "test_last_editor_lifecycle_paths_dblane.py"
Cohesion: 0.19
Nodes (21): MembershipActionBody, patch_membership(), _audit(), _active_editors(), _assert_one_loser_409(), _membership_action(), _call(), Barrier (+13 more)

### Community 359 - "build_architectural_door_rows"
Cohesion: 0.19
Nodes (22): assemble_architectural_door_schedule(), build_architectural_door_rows(), _door_sort_key(), Architectural Door schedule shaping (Wave 10). Pure-Python — no fastapi/DB/AEC-…, One row per door element. Sorted by Mark (numeric if possible, then alpha).…, Top-level shaper: instance-grain door rows + totals (door_count + by_type)., _el(), Pure-core tests for the Wave 10 Architectural Door schedule shaper. (+14 more)

### Community 360 - "test_architectural_room_finish_schedule.py"
Cohesion: 0.19
Nodes (22): assemble_architectural_room_finish_schedule(), build_architectural_room_finish_rows(), Architectural Room Finish schedule shaping (Wave 10). Pure-Python — no…, One row per Room element. Sorted by Room Number (alpha-numeric) then Name. All…, Top-level shaper: instance-grain room rows + totals., _el(), Pure-core tests for the Wave 10 Architectural Room Finish schedule shaper. No…, _num_from tolerates unit-suffixed values like '2.74 m'. (+14 more)

### Community 361 - "test_ops_metrics.py"
Cohesion: 0.15
Nodes (21): ProjectionHealth, assemble_ops_metrics(), is_stale_deny_reason(), datetime, timedelta, Authorization-Inheritance operational metrics (plan v3 §7b.9) — the pure…, Assemble scalar counts (from the query layer) into the immutable ops snapshot.…, True when a decision-stream reason denotes a freshness/availability denial (not… (+13 more)

### Community 362 - "build_mechanical_air_terminal_rows"
Cohesion: 0.21
Nodes (22): _air_terminal_system_summaries(), assemble_mechanical_air_terminal_schedule(), build_mechanical_air_terminal_rows(), Type-grain: one row per family/type with count, sorted by type mark., Terminal count + total airflow (CFM) per System. Per-type airflow (cfm) is…, _el(), test_cfm_fallback_flow(), test_cfm_fallback_supply_air_flow() (+14 more)

### Community 363 - "build_mechanical_equipment_rows"
Cohesion: 0.22
Nodes (22): assemble_mechanical_equipment_schedule(), build_mechanical_equipment_rows(), _mark_sort_key(), _el(), test_cooling_capacity_watts(), test_empty_returns_empty(), test_heating_capacity_watts(), test_instance_grain_all_returned() (+14 more)

### Community 364 - "test_nav_handle.py"
Cohesion: 0.16
Nodes (22): _b64e(), mint_handle(), nav_handle_secret(), _payload(), Opaque navigation handles for the Assistant's project_navigation context…, Return the one candidate ``item_id`` the handle was minted for, or ``None``.…, HMAC key for navigation handles. Empty → the caller MUST fail closed., Mint a handle for ``item_id`` bound to (user, firm, project). Raises… (+14 more)

### Community 365 - "build_structural_foundation_rows"
Cohesion: 0.20
Nodes (22): Top-level shaper: instance-grain rows + totals. Caller pre-filters to category…, assemble_structural_foundation_schedule(), build_structural_foundation_rows(), _name_of(), Structural Foundation schedule shaping (Wave 13 — Structural). Pure-Python — no…, One row per foundation element, sorted by name (case-insensitive). Dimensional…, _footing(), Wave 13 — Structural Foundation schedule shaper unit tests. Instance-grain (one… (+14 more)

### Community 366 - "is_suppressed_element"
Cohesion: 0.14
Nodes (20): is_suppressed_element(), Element suppression — elements that must never surface anywhere in the product.…, True if an element's name / family / type carries a suppression marker. Each…, Pure-lane tests for aec/suppression.py. `is_suppressed_element` is the single…, test_case_insensitive_lowercase_marker(), test_case_insensitive_mixed_case_marker(), test_empty_dict_returns_false(), test_empty_strings_return_false() (+12 more)

### Community 367 - "secure_cookies_enabled"
Cohesion: 0.12
Nodes (23): INFRA-M3 (2026-07-10 audit): the single source of truth for whether…, secure_cookies_enabled(), exception_handler, _bind_request_id(), _csrf_protect(), _ensure_csrf_cookie(), _is_transient_redis_error(), JSONResponse (+15 more)

### Community 368 - "test_autodesk_first_actors.py"
Cohesion: 0.12
Nodes (16): _aps_env_present(), backfill(), flag_off(), flag_on(), origin_probe(), fixture, B6 — the Autodesk-first actor model (aec.autodesk_first_actors), pure lane. No…, _reseed() (+8 more)

### Community 369 - "_login"
Cohesion: 0.26
Nodes (24): _blocked(), _enqueue(), _fetch_spy(), _job(), _login(), _process(), A real server-side session for a fresh Autodesk user. Returns (user, sid,…, W5 P1F item 7: the user reaches the project but not the model's folder. In… (+16 more)

### Community 370 - "test_editor_recovery_cli.py"
Cohesion: 0.12
Nodes (18): _argv(), parametrize, W9 lane C — ``aec.editor_recovery`` CLI surface, pure lane (no DB). Pins…, The operator follows the repo's documented ``on`` spelling and must get the…, test_actor_column_carries_the_operator_hash(), test_arm_accepts_every_documented_affirmative(), test_arm_stays_off_for_negatives_blank_and_malformed(), test_audit_detail_carries_operator_hash_never_the_raw_operator() (+10 more)

### Community 371 - "test_teams_pairing_store.py"
Cohesion: 0.08
Nodes (11): _memory_store(), fixture, Microsoft Teams Assistant Gateway -- pairing mechanics that don't touch the DB…, THE bug this function exists to prevent: a reply inside a channel thread…, Callers must treat "" as 'cannot bind', never as a wildcard that would let one…, An activity with no tenant cannot be scoped to a firm at all; the router must…, Both gateways use the same shared store. A Teams consent state must not be…, test_conversation_key_is_empty_when_nothing_usable_is_present() (+3 more)

### Community 372 - "ai_context_policy_router.py"
Cohesion: 0.15
Nodes (22): AiContextPolicyBody, AiContextPolicyOut, _audit(), _firm_row(), get_project_ai_context_policy(), _policy_of(), ProjectPolicyActor, BaseModel (+14 more)

### Community 373 - "build_architectural_wall_type_rows"
Cohesion: 0.20
Nodes (21): assemble_architectural_wall_type_schedule(), build_architectural_wall_type_rows(), Architectural Wall Type schedule shaping (Wave 10). Pure-Python — no…, Group wall instances by type; one row per type with count. Type-level columns…, Top-level shaper: type-grain wall rows + totals., _wall_type_name(), _el(), Pure-core tests for the Wave 10 Architectural Wall Type schedule shaper. (+13 more)

### Community 374 - "_persist_category_rows"
Cohesion: 0.14
Nodes (21): _persist_category_rows(), Bulk-upsert one category's element rows into element_cache. F-5 — transaction…, _row_to_dict(), mv(), TEST-5 — live-DB behavioral pair for test_phase4_cache's source tripwires.…, F-5 boundary: commit=False flushes (rows visible IN the transaction) but leaves…, ElementType UniqueId contract (2026-09-11): type_unique_id lands on insert, is…, A throwaway ModelVersion row owning this test's element rows. (+13 more)

### Community 375 - "discipline_field_probe.py"
Cohesion: 0.14
Nodes (21): _b(), Column, ColumnResult, _d(), _e(), _f(), _fa(), match_column() (+13 more)

### Community 376 - "test_help_corpus_guard.py"
Cohesion: 0.15
Nodes (21): _parse_frontmatter(), Split a leading `---` frontmatter block. Returns (meta, body). Parses simple…, _corpus_last_verified(), CI corpus-boundary guard for the client help library (backend/aec/help/*.md).…, Violations across every *.md in help_dir., Map of help filename -> parsed last_verified date for every article., All corpus-boundary violations in one help article. Empty list = clean., test_guard_allows_clean_client_language() (+13 more)

### Community 377 - "test_migration_phase9_element_product_bindings.py"
Cohesion: 0.14
Nodes (18): ProfileInfo, Protocol, deco(), _inspector(), _load_migration(), Phase 9 migration 9e1c7f3a2b5d — guard decisions, pure lane (mocked op +…, Template mapping rows (hub_id NULL) are re-seedable and must never block the…, b4d7e2f9c1a3 (firm-owned bindings) chained on top of this revision, so the… (+10 more)

### Community 378 - "param_aliases.py"
Cohesion: 0.11
Nodes (19): AliasConflictError, AliasError, _build_registry(), family_name_prefix(), FirmAliasRule, MalformedAliasError, ValueError, _r() (+11 more)

### Community 379 - "enqueue"
Cohesion: 0.13
Nodes (21): enqueue(), Insert a pending job; ON CONFLICT (project, model, version, category, kind) DO…, _cleanup(), _job_rows(), Done-row wedge (found live 2026-06-10, exposed by GA-H1+GA-H5 deploy smoke):…, The live wedge: done rows for the refreshed version must die with its data., GA-H2's sweep must take the superseded versions' job rows with the data., _seed_done_job() (+13 more)

### Community 380 - "product_binding_refresh.py"
Cohesion: 0.17
Nodes (21): CompleteInventory, _default_session_factory(), _is_stale(), _lock_model(), Session, Phase 9 — when element-product bindings are re-synced against warmed inventory.…, Live trigger: one ``category_warm`` job reached ``done`` under its own claim.…, Seam for a future full-version completion event (none exists today). The caller… (+13 more)

### Community 381 - "test_qa_discipline.py"
Cohesion: 0.17
Nodes (22): detect_discipline(), Infer a model's dominant discipline from the categories present in `elements`.…, _alias_rule(), _el(), _electrical_model(), Phase 11 — discipline-aware model-health + electrical rule set (pure unit…, test_architectural_model_does_not_run_electrical_rules(), test_detect_discipline_architectural_dominant() (+14 more)

### Community 382 - "test_cfgb_posture_and_aps_boot.py"
Cohesion: 0.21
Nodes (21): _check_aps_config(), W5 CFG-B: APS OAuth config (APS_CLIENT_ID / APS_CLIENT_SECRET /…, _d6_guards_armed(), _full_aps(), _posture(), parametrize, W5 CFG-B — boot-time posture parity, APS startup config check, /auth/login…, D6 rule, spelled out independently of the resolver. (+13 more)

### Community 383 - "TestClient"
Cohesion: 0.14
Nodes (20): TestClient, _as_user(), P3-8-DYN: cross-firm read/write isolation, now that get_firm_id() can resolve…, Sanity check on the write side of isolation: a view User A creates is scoped to…, Route every get_autodesk_user_id() import site to `user_id`, matching the…, test_firm_b_cannot_delete_firm_a_view(), test_firm_b_cannot_patch_firm_a_view(), test_firm_b_cannot_see_firm_a_firm_scoped_view() (+12 more)

### Community 384 - "test_2legged_token.py"
Cohesion: 0.16
Nodes (18): _auth(), _counting_client(), _error_client(), _ExplodingClient, _isolate(), Validates cached 2-legged APS app tokens used by constrained service-identity…, A token POST whose response raises HTTPStatusError(status), built off the SUT's…, Two callers race the SAME cold scope: the double-checked lock must let exactly… (+10 more)

### Community 385 - "_StubDb"
Cohesion: 0.11
Nodes (16): cache(), _Clock, Only what the module touches: ``get(ProjectHubCache, project_id)``., _StubDb, test_401_evicts_the_whole_user_token_set_and_reraises(), _body(), test_403_evicts_exactly_that_project(), _body() (+8 more)

### Community 386 - "test_migration_phase9_firm_product_reviews.py"
Cohesion: 0.25
Nodes (22): _apply(), _decide(), _inspector(), _load(), _present(), db_lane, Phase 9 migration a7d3f9c2e5b8 — per-firm review decisions for hub-global…, _run() (+14 more)

### Community 387 - "TestNamedDeliverableOrmExposure"
Cohesion: 0.09
Nodes (7): Audit P1-1 regression tests: Phase 3.4.2 ORM exposure + create_view invariant.…, The post-audit cleanup migration must exist and be scoped to smoke rows., The six Phase 3.4.2 columns must be declared on the ORM., Backend create_view must populate `categories[]` from `category_key`., TestCategoriesBackfillMigration, TestCreateViewCategoriesInvariant, TestNamedDeliverableOrmExposure

### Community 388 - "test_reclaim.py"
Cohesion: 0.15
Nodes (20): _cleanup(), _make_job(), RE-1 (2026-07-06 audit) — periodic reclaim of ProvisioningJob rows stuck at…, A job that entered 'provisioning' moments ago is legitimately in-flight and…, A job stuck 'provisioning' past the threshold (its owning process was killed)…, Only 'provisioning' rows are ever touched — planning/complete/failed/…, test_reclaim_fails_stale_provisioning_job_and_records_history(), test_reclaim_ignores_other_statuses_no_matter_how_old() (+12 more)

### Community 390 - "build_plumbing_fixture_rows"
Cohesion: 0.24
Nodes (21): assemble_plumbing_fixture_schedule(), build_plumbing_fixture_rows(), Type-grain: one row per family/type with count, sorted by name., _el(), test_conn_size_is_raw_metre_range(), test_conn_size_none_when_absent(), test_cwfu_key(), test_cwfu_zero_not_none() (+13 more)

### Community 391 - "test_migration_phase9_nullable_canonical_key.py"
Cohesion: 0.25
Nodes (21): contextlib, _apply(), _insert(), _inspector(), _load(), db_lane, Phase 9 migration c3a8f1d6e2b7 — canonical key option B (nullable key, partial…, _run() (+13 more)

### Community 392 - "test_assistant_endpoint.py"
Cohesion: 0.14
Nodes (14): _clear_live_pending(), _post_revert(), fixture, parametrize, Phase 4a: /assistant router + chat endpoint tests. These mount the router on a…, Isolate the in-memory pending-read store between tests (mirrors…, _revert_client(), test_assistant_enabled_uses_canonical_flag_parse() (+6 more)

### Community 393 - "test_gql_client.py"
Cohesion: 0.16
Nodes (17): _FakeResp, fixture, Wave 4.6.5 Session 3 — pooled httpx client + transport-error mapping (_gql).…, Stub .post to walk `items` (each a _FakeResp or an Exception to raise); the…, real_httpx(), _seq_post(), _stub_post(), test_connect_error_mapped_to_network() (+9 more)

### Community 394 - "test_groups_views_hub_isolation.py"
Cohesion: 0.21
Nodes (21): _assert_enroll_denied(), _assert_foreign_group_hidden(), _assert_hub_denied(), _group_body(), SEC-GROUPS-VIEWS-HUB-ISOLATION (2026-08-07) — /data/groups + /data/views route-…, _seed(), test_create_group_cross_hub_denies(), test_create_view_cross_hub_denies() (+13 more)

### Community 395 - "test_migration_phase9_ingestion_provenance.py"
Cohesion: 0.25
Nodes (21): _applied(), _apply(), _insert_full(), _inspector(), _load(), db_lane, Phase 9 migration d5e2a7c9f4b1 — ingestion provenance on product_records…, _run() (+13 more)

### Community 396 - "EditLog"
Cohesion: 0.20
Nodes (20): Audit trail lookup for revit_link parameter writes (Phase 7 audit-gate). Read-…, tool_query_edit_log(), EditLog, Append-only log of every write_instance_parameter attempt. References…, _ctx(), fixture, DB-lane test for the query_edit_log assistant tool — real EditLog rows via the…, A caller with no firm identity (ctx.firm_id is None) must see nothing — fail… (+12 more)

### Community 397 - "artifacts_repo.py"
Cohesion: 0.18
Nodes (20): get_artifact(), get_draft(), list_candidate_artifacts_for_audience(), list_firm_artifacts(), _norm(), publish_from_draft(), Any, datetime (+12 more)

### Community 398 - "test_merge_linked_room_columns.py"
Cohesion: 0.19
Nodes (20): _merge_linked_room_columns(), Merges cross_model_join results onto `elements` in-place. Injects INTO…, Calls assemble_and_resolve and merges its results onto `elements` in-place,…, run_linked_room_join(), _FakeDb, _join_result(), Phase 3.10a — unit tests for _merge_linked_room_columns and…, assemble_and_resolve is monkeypatched in every test below, so the real db… (+12 more)

### Community 399 - "digest.py"
Cohesion: 0.19
Nodes (19): build_digest_payload(), get_or_build_digest(), _last_indexed(), datetime, Phase 4d Lever 4 (Proactive Surfacing): per-model digest. A digest is a brief,…, Return the digest for the current model version, generating it lazily on the…, Run the QA health rules over the whole model via the shared serve path. Returns…, Assemble the digest dict from already-fetched facts. `categories` is the… (+11 more)

### Community 400 - "classify_discipline"
Cohesion: 0.16
Nodes (18): classify_discipline(), _counts(), Any, Discipline classification for indexed models (data-driven, filename-free).…, Normalise [{name,count}] dicts / objects-with-.name/.count → {name: count}., Classify a model's discipline from its category list. `cats`: iterable of…, Behavioral tests for aec.discipline — the data-driven discipline classifier.…, test_accepts_object_shape() (+10 more)

### Community 401 - "test_explore_allowlist.py"
Cohesion: 0.13
Nodes (16): probe_model_categories(), {category: set(exposed param names)} for one model, via the proven Data-tab…, _EmptyFirmHubsDB, _EmptyHubsQuery, _fixed_firm(), real_hub_tenancy, ASST-1 / ASST-3 (2026-06-10 audit) — the diagnostics paths must enforce…, PLAT-9: the operator CLI now gates on firm↔hub tenancy. A project whose hub… (+8 more)

### Community 402 - "build_fire_protection_sprinkler_rows"
Cohesion: 0.24
Nodes (19): assemble_fire_protection_sprinkler_schedule(), build_fire_protection_sprinkler_rows(), Type-grain: one row per family/type with count, sorted by sprinkler type., _el(), test_empty_returns_empty(), test_k_factor(), test_missing_params_returns_empty(), test_multiple_types_deduplicated() (+11 more)

### Community 403 - "relationships_fetch.py"
Cohesion: 0.14
Nodes (19): _acquire_relationships_lock(), _fetch_all_elements_for_relationships(), _load_relationships_blob_sync(), _load_warm_relationships(), Session, Assembled-relationships fetch engine + its in-process cache (ARCH-10).…, The single bounded insertion point for _RELATIONSHIPS_CACHE. Evicts the oldest…, Sync durable read of one assembled relationships blob, for asyncio.to_thread.… (+11 more)

### Community 404 - "test_revit_context_injection.py"
Cohesion: 0.18
Nodes (19): parse_revit_context(), Typed parse of the pane's `revit_context` value. None on anything that is not a…, One system-block string. The payload is a JSON literal, so every user-authored…, render_revit_context(), _payload(), Phase 15c — typed Revit pane context injection. Pins: - the pane's…, _revit_block(), test_all_garbage_yields_no_block() (+11 more)

### Community 405 - "test_authz_enforce_keystone.py"
Cohesion: 0.18
Nodes (20): AuthzDecisionLog, Append-only security-decision audit stream for the Authorization-Inheritance…, _change_set(), _clear_decisions(), _decision_rows(), _listed_ids(), _projection(), fixture (+12 more)

### Community 406 - "_FakeProvClient"
Cohesion: 0.13
Nodes (14): ProvisioningJobStatusHistory, Append-only status-transition log for ProvisioningJob (Audit & History Pattern…, _FakeProvClient, Same race as…, WIZ-5 (2026-07-08 audit): any raise between the claim commit and the outcome…, Minimal injected provisioning client — records nothing, just returns ids., Option A end-to-end: one stored (verified) token backs BOTH provisions — the…, WIZ-1 (2026-07-08 audit): if the reclaim sweeper flips a job to 'failed' while… (+6 more)

### Community 407 - "test_admin_router_audit_edits.py"
Cohesion: 0.26
Nodes (19): _make_client(), _make_edit_log_row(), _mock_db_with_rows(), Phase 7 audit-gate: read-only admin visibility into edit_log. GET…, A MagicMock Session whose query(EditLog).filter(...).order_by(...)…, test_export_edits_rejects_unknown_format(), test_export_edits_xlsx_body_is_valid_workbook(), test_export_edits_xlsx_requires_admin_auth() (+11 more)

### Community 408 - "test_assistant_nav_firm_scope_dblane.py"
Cohesion: 0.18
Nodes (20): _authz_off_and_secret(), _ctx(), _nav(), fixture, DB-lane: project_navigation's model listing is scoped by the SERVER-resolved…, Firm A claiming Firm B's hub id gets nothing — the firm grant wins., If APS has verified the project lives in hub B, Firm A's grant on hub A does…, Firm-scoped AI context policy row (SEC-1: keyed (firm_id, project_id)). (+12 more)

### Community 409 - "test_change_set_separate_approver_d2.py"
Cohesion: 0.22
Nodes (19): _as(), _cs(), _history(), _in_review(), fixture, parametrize, D2 (Wave 6): ratified separate-approver policy — non-race API truth table.…, Firm A (author + reviewer) and firm B (an active member of B only). (+11 more)

### Community 410 - "test_grant_refused_on_inactive_firm.py"
Cohesion: 0.14
Nodes (17): client(), _grant_editor(), fixture, parametrize, Wave 4 scenarios, Part 1 — grant writers refuse when the caller's firm is not…, Lock order is firm -> memberships on both sides. A grant writer holds the firm…, A first login's bootstrap locks the firm's active memberships, then its INSERT…, _set_status() (+9 more)

### Community 411 - "test_integrations_control_plane.py"
Cohesion: 0.16
Nodes (13): _denial_code(), _patch_registration(), Phase 17.0 Integration Control Plane: contract, admission policy, and admin…, Make policy's registry read return `result` (or raise it)., _row(), test_absent_row_admits_grandfathered_kind(), test_absent_row_denies_post_charter_kind(), test_corrupt_status_denies_not_admits() (+5 more)

### Community 412 - "test_integrations_setup_doc_contract.py"
Cohesion: 0.21
Nodes (20): _all_declared_names(), _declared_names(), _doc(), doc_route_mentions(), _mounted_paths(), parametrize, Pattern, Slack/Teams SETUP.md runbooks agree with the declared config contract and… (+12 more)

### Community 413 - "test_pairing_block_metric.py"
Cohesion: 0.21
Nodes (17): _blocked_lines(), _cleanup(), _enqueue(), _job_row(), _pairing_error(), fixture, OBS — pairing_verification_background_blocked demand-evidence metric. Measures…, test_blocked_job_emits_one_metric_line_and_requeues_unchanged() (+9 more)

### Community 414 - "test_phase9_refresh_integration.py"
Cohesion: 0.28
Nodes (19): _bind(), _cat(), flag_on(), fixture, Phase 9 — binding refresh trigger policy (aec/product_binding_refresh.py). DB…, The newer version's rows were swept; only the binding remembers v5., Commit one warmed version. rows = [(unique_id, category, type_name), ...]., _row() (+11 more)

### Community 415 - "test_w9_int.py"
Cohesion: 0.18
Nodes (15): single_flight_size(), _auth_error(), Wave 9 integration (2026-09-21): behaviour pinned for the cross-lane "INT to…, Negative outcomes are not cached, so every waiter re-probes itself (serially)., _scope(), _stub_upstream(), test_a_denial_is_never_borrowed_by_a_waiting_caller(), one() (+7 more)

### Community 416 - "audit_stream_worker.py"
Cohesion: 0.15
Nodes (19): _delete_batch(), _flush_loop(), purge_once(), datetime, Event, Audit-stream maintenance worker (SEC-AUTHZLOG-RETENTION-1, 2026-08-17 audit).…, Lifespan shutdown hook: final drain, then revert to synchronous writes.…, Configured retention window; a malformed or non-positive value falls back to… (+11 more)

### Community 417 - "build_ict_communication_device_rows"
Cohesion: 0.25
Nodes (18): assemble_ict_communication_device_schedule(), build_ict_communication_device_rows(), _mark_sort_key(), Instance-grain, sorted by Mark., _el(), test_description_fallback_plain(), test_description_numbered_key(), test_device_type_numbered_key() (+10 more)

### Community 418 - "asyncio"
Cohesion: 0.15
Nodes (15): asyncio, sys, _bind_session(), Phase 5 — APS Viewer wave, B2 + P0-α pt1 / P1-θ: the /aps/viewer-token…, AUTH-INH #11 / DoD #14 (owner option 1): with the backend derivative proxy…, Bind a synthetic session and return the ContextVar reset token., PLAT-4: the Viewer must NOT receive the user's full 3-legged session token…, An already-expired session reports 0, never a negative number. (+7 more)

### Community 419 - "favorites_router.py"
Cohesion: 0.15
Nodes (17): _actor_user_id(), delete_favorite(), FavoriteIn, list_favorites(), put_favorite(), BaseModel, delete, field_validator (+9 more)

### Community 420 - "test_logging_config.py"
Cohesion: 0.14
Nodes (17): configure_app_logging(), Application logging configuration, isolated from `main` so it is testable.…, Diagnostic obs #6: the application loggers (aec.*, aps.*, …) had no handler, so…, _census(), _logs_under_own_name(), Path, SLOP-LOG-1 (weekly audit 2026-09-11): pins the application's handler set.…, The finding itself, pinned at the record that matters. Deliberately NOT… (+9 more)

### Community 421 - "verify_request"
Cohesion: 0.19
Nodes (18): Slack Assistant Gateway -- request signature verification. Slack's documented…, True iff `signature` is a valid Slack v0 HMAC over (timestamp, raw_body) under…, verify_request(), Slack Assistant Gateway -- request signature verification tests. Pure-function…, hmac.compare_digest raises TypeError on non-ASCII str. Starlette decodes…, int() accepts Unicode whitespace, so "<epoch>\\xa0" survives the parse and the…, A captured valid (secret, timestamp, body, signature) tuple stops verifying…, _sign() (+10 more)

### Community 422 - "test_authz_lifecycle_router.py"
Cohesion: 0.24
Nodes (16): _client(), _FakeSession, fixture, Project-unenrollment purge admin HTTP surface (AUTH-INH plan §7b.10). DB-lane…, WP4: a grantee holds no projection rows, so staling the projection does not…, _stub_counts(), test_unenroll_200_reports_per_subsystem_counts(), test_unenroll_audits_the_share_count() (+8 more)

### Community 423 - "test_authz_telemetry.py"
Cohesion: 0.13
Nodes (14): _ev(), _fresh_registry(), fixture, parametrize, W7.1a — aec.authz_telemetry registry + decision events (pure lane). Pins: the…, test_counts_rates_and_by_reason_keys(), test_denial_ring_is_bounded_and_ignores_allows(), test_latency_percentiles_nearest_rank() (+6 more)

### Community 424 - "_seed_model_version"
Cohesion: 0.21
Nodes (18): _background_sid(), _check_once(), _grant_selected_projects(), _jobs(), A firm holding _HUB with selected_projects scope, _P enrolled or not., W5 P1F item 7: under the flag a hub grant alone is not enough for an app-token…, _seed_model_version(), test_version_check_off_is_legacy() (+10 more)

### Community 425 - "test_change_set_separate_approver_flag.py"
Cohesion: 0.26
Nodes (19): _approve_rows(), _as(), _in_review(), parametrize, _race(), worker(), BIMPOSSIBLE_CHANGE_SET_REQUIRE_SEPARATE_APPROVER through every enforcement path…, Run approve_change_set for each approver concurrently, each in its own thread,… (+11 more)

### Community 426 - "test_filter_observations.py"
Cohesion: 0.16
Nodes (12): captured(), _ctx(), _FakeSession, _NullSession, R5 filter-observation telemetry — behavioral tests. Covers the five required…, Captures the ORM object handed to db.add(); query() raises so the optional…, _run(), test_live_success_records_one_live_observation() (+4 more)

### Community 427 - "test_migration_phase9_replay_identity.py"
Cohesion: 0.25
Nodes (19): _apply(), _indexes(), _ins(), _inspector(), _load(), db_lane, parametrize, Phase 9 migration f1b3c8e2a6d4 — exact-replay unique index on product_records.… (+11 more)

### Community 428 - "test_property_map_cache.py"
Cohesion: 0.17
Nodes (14): _FakePersist, _fresh(), _patch_persist(), WP-A1 (C-Cache-Pattern) characterization test for aec/schema.py's property-map…, Resolve the CURRENT module object from sys.modules. test_schema_persist.py pops…, Reset the module-level property-map cache + any per-key locks. Works against…, _reset_cache(), test_all_none_property_map_not_persisted() (+6 more)

### Community 429 - "build_project_context"
Cohesion: 0.15
Nodes (12): build_project_context(), _monotonic(), Policy-brokered project context for the assistant system prompt. * Resolves the…, _Ctx, model_data permits model-data task surfaces only: the assistant broker still…, A cached wayfinding block must not survive a tightening of the policy., test_help_only_produces_no_project_context_and_touches_nothing(), test_model_data_does_not_widen_the_assistant() (+4 more)

### Community 430 - "test_artifacts_authz.py"
Cohesion: 0.25
Nodes (18): Dark-by-default product flag for the Track-2 published-artifacts subsystem…, track2_artifacts_enabled(), _authz(), Track-2 v1 published-artifact read authorization — the fail-closed decision…, test_all_sources_authorized_serves(), test_any_denied_source_denies_whole_artifact(), test_empty_source_set_denies_fail_closed(), test_expired_denies() (+10 more)

### Community 431 - "_static_firm_id"
Cohesion: 0.15
Nodes (16): Every deployment's firm_id before P3-8-DYN, and the fallback since., _static_firm_id(), harness(), _purge(), Stub every non-authz seam; leave ``_authz_gate_model`` and the authz spine REAL., as_admin(), _assistant_gate(), no_role_user() (+8 more)

### Community 432 - "test_qa_coordination_report_router.py"
Cohesion: 0.20
Nodes (18): export_coordination_report(), Download the Coordination & Health Report. `format`: html (default) — self-…, _call_export(), _call_report(), _cleanup(), _import_parity_rule(), _no_token(), Phase 11.1 — /data/qa/coordination-report endpoint wiring (DB-lane). The report… (+10 more)

### Community 433 - "_check_separate_approver"
Cohesion: 0.27
Nodes (18): _check_separate_approver(), W9 F3 (review-all 2026-09-21 item 6; closes D2's enforcement gap): refuse to…, _clear(), _preflight_state(), parametrize, W9 F3 + F11 (review-all 2026-09-21 items 6 + 11): the D2 boot guard. D2…, Runtime trims (ON); preflight is deliberately stricter and reports the padding…, TLS-terminated-upstream shape: BIMPOSSIBLE_ENV=dev but secure cookies ON is… (+10 more)

### Community 434 - "test_nl_filter_monitor.py"
Cohesion: 0.11
Nodes (3): Deterministic regression tests for the NL-filter drift monitor. These run in…, _serialised_outputs(), test_summary_never_carries_query_text_or_model_output()

### Community 435 - "test_refresh_lock_per_sid.py"
Cohesion: 0.15
Nodes (12): _cleanup(), _expired_session(), P0-A (3rd audit) — the token-refresh lock must be PER-SID, not global. CRIT-3…, Concurrent requests on ONE session must spend the single-use refresh token…, clear_user_session must not leak per-sid locks (unbounded dict otherwise)., Stands in for httpx.AsyncClient: the refresh POST takes ~0.3s., Three different sessions refreshing at once must overlap (~0.3s), not queue…, _SlowClient (+4 more)

### Community 436 - "test_urn_project_binding.py"
Cohesion: 0.19
Nodes (16): _clear_binding_cache(), _fake_resolve(), fixture, Perp-audit PLAT-1 — the derivative endpoints must bind URN -> owning project,…, E3 (2026-08-08): the in-handler allowlist call is gone — the project verdict on…, Patch aps.router.resolve_derivative_urn to an async fn returning `returns`., _session_cookie(), test_404_when_item_has_no_derivative() (+8 more)

### Community 437 - "resolve_ai_context_policy"
Cohesion: 0.12
Nodes (12): Fail-closed policy lookup for the (firm, project) pair (testable seam).…, resolve_ai_context_policy(), SLOP-1 (WFA 2026-09-14): a policy-store outage still fails CLOSED (help_only),…, A recipient firm reaching a shared project must not inherit the owner firm's…, Wave 3 F7 / SEC-1: no firm → help_only WITHOUT touching the store (a share…, Context-manager stand-in for db.session.SessionLocal yielding ``db``., _Session, test_broker_resolver_is_firm_scoped() (+4 more)

### Community 438 - "TestRevertLegacyProjectBinding"
Cohesion: 0.16
Nodes (7): _bind_legacy_proposal_project(), proposal_project_matches(), W9 F1 (review-all 2026-09-21 item 1): the D1b project-binding rule, shared by…, Stamp a legacy (NULL-project) proposal with the project its first gated revert…, W9 F1 (review-all 2026-09-21 item 1): the D1b project binding for legacy (NULL-…, project_id=None is the flag-off call shape: the legacy row reverts as before…, TestRevertLegacyProjectBinding

### Community 439 - "test_domain_names.py"
Cohesion: 0.19
Nodes (14): Challenge, check_txt(), fingerprint(), new_challenge(), DNS TXT domain-control verification (Phase 6 Client-Mgmt E). Challenge shape —…, Log-safe 12-hex correlation id for a challenge value., Look up ``record_name`` and classify the result against ``expected``.…, Fresh challenge for an already-normalized domain. (+6 more)

### Community 440 - "test_model_boot_guard.py"
Cohesion: 0.23
Nodes (17): reset_settings_cache(), _check_assistant_model_config(), Model routing slice 1A: fail fast (every posture) when the compiled model…, _clear(), Model routing slice 1A: the boot guard refuses an inconsistent registry /…, The recommended production posture (per-kind defaults PR): Sonnet 5 default +…, The guard re-reads env into the module-level settings cache; monkeypatch…, The guard re-reads env (reset_settings_cache) so a stale cached value from an… (+9 more)

### Community 441 - "revit_context.py"
Cohesion: 0.17
Nodes (12): _Base, _clean(), BaseModel, field_validator, Phase 15c — typed, bounded, injection-safe Revit pane context. The Revit…, Bounded, typed content only — the exact dict that gets rendered., Non-empty, control-char-free, length-clamped string — or None., RevitCloudIdentity (+4 more)

### Community 442 - "available_sections"
Cohesion: 0.10
Nodes (18): available_sections(), List the section numbers that currently have a clause library on disk., _pf(), A Plumbing Fixtures element., test_available_sections_includes_batch2(), test_available_sections_includes_batch3(), test_available_sections_includes_batch4(), test_available_sections_includes_batch5() (+10 more)

### Community 443 - "_route_handlers"
Cohesion: 0.15
Nodes (10): AsyncFunctionDef, _function_names(), Module, Audit P2-1 regression tests: router.py DRY refactor. Locks in the post-refactor…, Return {endpoint_path: handler_ast_node} for every @router.post-decorated async…, The DRY helper `_dispatch` must exist and the 4 live endpoints must use it., Every live /revit/* endpoint must call _dispatch — no inline try/except., _route_handlers() (+2 more)

### Community 444 - "test_firm_literal_gate_gap.py"
Cohesion: 0.16
Nodes (17): Pattern, _gated(), _live_gate_regex(), _normalize(), T4: pin what the firm-literal semgrep gate catches — and its DELIBERATE…, Python-side mirror of scripts/check-claude-md-gate-sync.mjs so the gap fixture…, Extract the metavariable regex from the live rule file — no hardcoding, so this…, True when semgrep would report this literal (start-anchored, like semgrep). (+9 more)

### Community 445 - "test_wire_contract_vectors.py"
Cohesion: 0.12
Nodes (14): mint(), PipeAttestationError, Exception, revit_link/pipe_attestation.py — pipe-leg attestation for remote…, Base for attestation mint failures (verification lives in the add-in)., Mint a pipe attestation for one document, keyed by one pane session. `now` is…, parametrize, P7 remote-sync security protocol — frozen wire-contract vectors (v1). PAIRED… (+6 more)

### Community 446 - "test_aps_discovery_tombstone.py"
Cohesion: 0.24
Nodes (15): _fake_get(), _forbid_index(), _page(), SLOP-APS-1 / SLOP-APS-2 (weekly audit 2026-09-11): a partial or not-ready…, A 202 anywhere under the root poisons the crawl — no partial `rvts`., The owner's empty-tree reconcile (test_cross_firm_write_denial) is unchanged., _rvt(), test_full_pagination_still_concatenates() (+7 more)

### Community 447 - "_stub_phase6"
Cohesion: 0.14
Nodes (13): M-1(b): a hold refused at admission is a typed 429 before any stream, and…, M-1(b): the hold is finalized (settled) when the stream ends, through the FIFO…, M-1(b): a turn that dies mid-stream still finalizes its hold, once, with reason…, P15-15C behavioral pin: a pane-supplied `revit_context` payload must reach the…, Stub Phase 6 gateway seams (project mode, budget, BYO key)., _stub_phase6(), test_chat_reservation_denied_is_typed_429_and_turn_never_runs(), _deny() (+5 more)

### Community 448 - "_FakeMessages"
Cohesion: 0.14
Nodes (9): _AlwaysRaisingMessages, _FakeMessages, _model_404(), Exception, _RaisingClient, _RaisingMessages, anthropic APIStatusError shape as far as classification reads it., _StatusError (+1 more)

### Community 449 - "test_assistant_models_membership_gate.py"
Cohesion: 0.16
Nodes (15): _client(), R2 (2026-09-04 Phase 3/4 remediation) — GET /assistant/models fails closed.…, The seeded active UserFirmMembership (conftest `auth`) → the gate resolves the…, test_models_200_for_active_member(), test_models_401_when_unauthenticated(), test_models_403_when_authenticated_but_unlinked(), _unlink(), PR A (2026-08-06 tenancy triage), Task 5 — /auth role routes fail closed.… (+7 more)

### Community 450 - "test_autodesk_first_unit.py"
Cohesion: 0.15
Nodes (16): parametrize, Option B / B2 — aec.autodesk_first + the flag-gated branch of…, _scope(), test_cache_keys_never_hold_the_raw_token(), test_content_cache_scope_is_empty_off_and_per_user_on(), _body(), test_expired_entitlement_is_reprobed(), _body() (+8 more)

### Community 451 - "test_firm_docs_upload_gaps_dblane.py"
Cohesion: 0.34
Nodes (16): _as(), _docs_root(), _firm(), _member(), fixture, DB-lane gap coverage for POST /firm-docs (upload), 2026-09-23. Complements…, _raw_files(), _rows() (+8 more)

### Community 452 - "build_ict_av_rows"
Cohesion: 0.21
Nodes (5): assemble_ict_av_schedule(), build_ict_av_rows(), _mark_sort_key(), Instance-grain AV-device rows (speakers, projectors, screens, rack-mount AV),…, TestAVSchedule

### Community 453 - "test_aps_auth_gate.py"
Cohesion: 0.15
Nodes (15): _auth_mod(), _fake_authed_get(), phase6_gate_overrides(), fixture, parametrize, P1-ζ + GA-H11 — every /aps read must authenticate BEFORE any cache lookup. The…, P1-ζ + GA-H11: the whole /aps read surface rejects sessionless callers., A real in-memory session; returns the cookie dict. No file writes. (+7 more)

### Community 454 - "_budget"
Cohesion: 0.13
Nodes (15): _budget(), _downgradable(), _drain_async(), #2: `_with_model_routed_event` merges `{**ev, **payload}`, so the NARROWED wire…, A concrete BudgetStatus for the endpoint tests — the rollup itself is a DB…, Entitlement filters the picker; exhaustion does not (the list is what the firm…, Slice 3.2: the picker banner must be truthful for the model the member actually…, No funded lower tier (starter funds only fast) or an admin-fixed model: an… (+7 more)

### Community 455 - "fixture"
Cohesion: 0.12
Nodes (12): _Aps, assistant_client(), change_sets(), _clean_rows(), fake_digest(), fixture, Fake APS keyed by the CURRENT user's token., Session gates the fake does not model: web session present, diag/auth helpers… (+4 more)

### Community 456 - "test_firm_docs_policy_unit.py"
Cohesion: 0.18
Nodes (13): _p(), parametrize, Pure-lane matrix for the CKA document policy (aec/firm_docs/policy.py, Decision…, _read(), test_financial_needs_explicit_grant_never_level(), test_firm_library_is_membership_only(), test_manage_rules(), test_multi_project_cites_only_reachable_projects() (+5 more)

### Community 457 - "test_panel_schedule_preparing.py"
Cohesion: 0.28
Nodes (16): _call_panel(), _cleanup(), _has_failed(), _job_count(), _panel_element(), Phase-5 perf fix — non-blocking /data/elements/panel_schedule contract. Opening…, A minimal but real Electrical Equipment panel element the assembler accepts., _setup() (+8 more)

### Community 458 - "world"
Cohesion: 0.12
Nodes (12): aps_bytes(), bearer_world(), _session_or_bearer(), md_upstream(), _never_probe(), fixture, A third item in the authorized project with NO ModelVersion/ModelIndex row,…, ``/aps/model/sheet-pdf`` + ``/aps/model/thumbnail`` bodies with no APS / cache… (+4 more)

### Community 459 - "test_relationships_durable.py"
Cohesion: 0.16
Nodes (13): _FakeStore, _patch_common(), _patch_persist(), fixture, OD2 Phase 1b — durable version-gated relationships cache. Measured live…, Cold both tiers: run the loop once, then persist the assembled result under the…, OD2 hardening (pool exhaustion): the relationships fetch must commit per-…, In-process stand-in for the durable seam (schema_persist). (+5 more)

### Community 460 - "test_search_hub_isolation.py"
Cohesion: 0.17
Nodes (14): _clean_rows(), PR A (2026-08-06 tenancy triage), Tasks 3-4 — /search hub isolation. Two…, Firm is allowed in HUB_A only. A model indexed under HUB_A is returned; an…, UX regression (S&L live smoke 2026-09-13): a discovered-but-never- opened stub…, PROJ_B is cached in HUB_B; the firm is only allowed in HUB_A. hub_id query…, Swap the caller to an unseeded user id (same mechanics as…, require_project_in_firm_hub calls aec.router._require_auth() (a bare `from…, _seed_hubs() (+6 more)

### Community 461 - "build_system_blocks"
Cohesion: 0.16
Nodes (15): build_system_blocks(), System prompt as content blocks, in cache-friendly order: [0] STATIC grounding…, test_help_only_request_serializes_without_any_project_context(), test_system_blocks_have_cache_breakpoint_and_grounding(), Phase 15 research (2026-07-15, owner-ratified): the assistant's voice is a…, test_system_blocks_carry_the_flat_professional_voice(), test_system_blocks_do_not_inline_help_content(), test_empty_selection_unchanged() (+7 more)

### Community 462 - "load_firm_policy"
Cohesion: 0.24
Nodes (14): load_firm_policy(), UUID, Per-firm model routing policy persistence (model routing slice 2). Translates…, Return (policy, revision_id). revision_id is None when no row exists (the…, Upsert the firm's policy row. Caller (the router) validates member_selection…, save_firm_policy(), FirmModelPolicy, Per-firm admin-set model routing policy (model routing slice 2). No row means… (+6 more)

### Community 463 - "IntegrationRegistration"
Cohesion: 0.22
Nodes (15): get_registration(), list_registrations(), Session, UUID, ValueError, Per-firm integration registry (Phase 17.0). Durable lifecycle state for (firm,…, Raised when a kind outside INTEGRATION_KINDS is written to the registry., All registry rows for one firm — callers must already have scoped the firm… (+7 more)

### Community 464 - "acquire_or_wait"
Cohesion: 0.22
Nodes (14): Run migrations in 'online' mode. In this scenario we need to create an Engine…, run_migrations_online(), acquire_or_wait(), ARCH-7 (2026-06-29 audit) — serialize concurrent Alembic migrators. `alembic…, One non-blocking attempt. True iff this session now holds the lock., Release a previously-acquired lock. True iff a lock was actually held. (Closing…, Acquire the migration advisory lock, polling until acquired or the deadline…, release() (+6 more)

### Community 465 - "test_nl_filter_eval_contract.py"
Cohesion: 0.13
Nodes (4): cases(), Deterministic contract tests for the NL-filter eval harness. These run in…, _raw_cases(), test_every_case_satisfies_contract()

### Community 466 - "_patch_user_gate"
Cohesion: 0.14
Nodes (13): _assert_no_secrets(), _boom_async(), _patch_user_gate(), _scope(), W5 P1F item 6: Autodesk entitlement alone never runs a user's job. The user…, W5 P1F item 7: a job that reads one item (a prewarm fill, possibly with the app…, test_user_actor_entitled_runs_bound_to_its_own_sid_then_unbinds(), test_user_actor_on_item_must_be_visible_to_the_users_own_token() (+5 more)

### Community 467 - "test_change_set_review_transitions.py"
Cohesion: 0.20
Nodes (13): _as_user(), _cleanup(), _firm(), _history(), in_review(), _member(), fixture, DB-lane regression tests: the review transitions the web Review controls drive.… (+5 more)

### Community 468 - "owner"
Cohesion: 0.13
Nodes (15): grantee(), grantee_change_set(), grantee_with_own_reach(), _no_hub_cache(), owner(), fixture, Drop the project→hub cache row, forcing own-reach onto the ``model_index``…, Owner firm: all_projects on hub A; projects 1 and 2 cached there. (+7 more)

### Community 469 - "test_groups_403_ordering.py"
Cohesion: 0.20
Nodes (15): _assert_access_403(), _assert_uniform_not_found(), _deny_access(), foreign_offlist_group(), _make_group(), own_offlist_group(), fixture, SEC-GROUPS-403-ORDERING (2026-08-07) — update_group/delete_group 403 ordering.… (+7 more)

### Community 470 - "test_pane_pairing_index.py"
Cohesion: 0.26
Nodes (15): _count_scans(), _forbid_scans(), _memory_store(), _pair(), fixture, P7 remote-sync security protocol — per-user pane-session index.…, Make any store scan blow up loudly; returns nothing — the test fails on scan., test_expired_session_pruned_from_index_scan_free() (+7 more)

### Community 471 - "_Store"
Cohesion: 0.12
Nodes (7): fixture, Authenticated personal identity, fake store/db/audit, usage + credential spies.…, Owner-scoped query helpers replaced by spies that record the identity/limit…, personal_conversation_store stand-in, owner-scoped like the real one., _Store, usage_wired(), wired()

### Community 472 - "test_request_context.py"
Cohesion: 0.17
Nodes (10): _drive(), _next(), parametrize, W7.1a — aec.request_context: request-id sanitisation, ContextVar binding, ASGI…, _Req, _Resp, test_middleware_honours_a_safe_inbound_id_and_echoes_it(), test_middleware_mints_when_absent_and_resets_on_error() (+2 more)

### Community 473 - "test_rollout_diagnostics.py"
Cohesion: 0.20
Nodes (13): _env(), _fresh(), no_redis(), fixture, W7.1b — python -m aec.rollout_diagnostics: flag posture, Redis readiness, cache…, test_build_report_from_snapshot_file(), test_build_report_in_process_snapshot(), test_flag_posture_uses_readiness_classifier() (+5 more)

### Community 474 - "test_discipline_field_probe.py"
Cohesion: 0.19
Nodes (9): probe(), Session, Diagnostic: resolves AEC Data Model IDs from APS DM IDs, then finds element…, _mock_probe_boundary(), Pure-core tests for the discipline field-exposure probe (Waves 10-17). Runs in…, Mock the live boundary so main()'s control flow can be exercised purely.…, test_main_live_probe_requires_item_id(), test_main_resolves_model_urn_from_item_id_when_omitted() (+1 more)

### Community 475 - "_Session"
Cohesion: 0.22
Nodes (12): find_project_model(), list_project_models(), list_project_models_in_hubs(), ModelChoice, Model picking for chat-platform gateways (aec/model_picker.py). Extracted from…, Models in `project_id` whose name matches `name_query` (case-insensitive).…, A pickable model, detached from the DB session on purpose. Callers invoke these…, Models BIMpossible has already SEEN in this project, most-recent first. Same… (+4 more)

### Community 476 - "sync_field_mappings_from_registry"
Cohesion: 0.18
Nodes (14): Upsert the registry template rows (hub_id NULL) keyed by (category,…, Template rows that apply to ``category``: its own rows plus the ``*`` rows. A…, RegistrySyncResult, sync_field_mappings_from_registry(), _template_mappings_for_category(), CategoryFieldMapping, Enrichment map: which product field lands in which BIMpossible shared…, Two first syncs interleave: session B inserts and commits every template row… (+6 more)

### Community 477 - "format_health_csv"
Cohesion: 0.27
Nodes (14): _cell(), format_health_csv(), None → "" so a missing element_id/param renders blank, not the literal 'None'.…, Render a model-health report as CSV. Layout: a block of `# key: value` context…, _panel_finding(), Phase 11 — model-health report export formatter (pure unit tests). The smoke…, Parse the CSV body, dropping the leading '#'-commented context header., _rows() (+6 more)

### Community 478 - "_clean_runs"
Cohesion: 0.14
Nodes (15): Case, CaseRun, _clean_runs(), A provider outage proves nothing about drift, so it must be a distinct exit…, One repeat cannot see a flip. A live run of --repeats 1 must be a hard error…, A live sweep over a handful of cases scores a clean mean over almost nothing.…, `--report` is what the alert file, docs/CI-GATES.md and the eval README all…, _run() (+7 more)

### Community 479 - "_build_fastapi_stub"
Cohesion: 0.21
Nodes (13): Path, _build_fastapi_stub(), Regression: the lightweight FastAPI stub (revit_link/conftest.py) explains…, Build a fresh stub from `_make_fastapi_stub` in revit_link/conftest.py without…, test_fastapi_stub_reports_unsupported_symbol_actionably(), test_fastapi_stub_still_provides_supported_symbols(), test_fastapi_stub_underscore_names_stay_normal_attribute_errors(), _doc_files() (+5 more)

### Community 480 - "circuit_readability_harness.py"
Cohesion: 0.22
Nodes (14): EvalRun, format_report(), frozen_tool_result(), _has_item_per_circuit(), _list_items(), load_fixture(), Circuit-readability eval harness (owner regression 2026-08-16, report-only).…, True iff every fixture circuit has at least one list item carrying its Panel or… (+6 more)

### Community 481 - "test_relay_error_map.py"
Cohesion: 0.20
Nodes (12): _client_factory(), _FakeResponse, parametrize, _raise_relay_error(), BIMP-RELAY-ERROR-MAP-GAP (2026-08-25) — relay-level codes TIMEOUT / PIPE_BUSY /…, The raised error's message is the relay's message string verbatim — no request…, Every enum member must have an ERROR_HTTP_STATUS entry (router contract)., test_error_carries_relay_message_only() (+4 more)

### Community 482 - "test_allowlist_subsystem_removed.py"
Cohesion: 0.13
Nodes (14): _clean_grant_rows(), parametrize, real_hub_tenancy, Teardown invariant — the legacy ALLOWED_PROJECT_IDS / guard.py subsystem is…, Belt-and-suspenders: an all_projects grant on HUB_IN authorizes any project in…, None of the dedicated allowlist modules exist any longer. Import must fail at…, The gate functions are gone from the codebase, not merely relocated. If any…, The ORM model was deleted, so `allowed_projects` must not be registered on the… (+6 more)

### Community 483 - "_client"
Cohesion: 0.17
Nodes (15): _client(), The synthesized tool_result the model receives is the last user message's…, Deterministic fake transport: a matching-document result is ingested, control-…, A result answered from a DIFFERENT document than the read was bound to is never…, A client-reported failure (e.g. Revit offline/busy) is relayed to the model as…, A non-JSON / malformed body (ticket already consumed) becomes a typed…, An over-limit payload is rejected on size BEFORE JSON decoding and mapped to…, test_chat_401_when_unauthenticated() (+7 more)

### Community 484 - "test_assistant_navigation_resolve.py"
Cohesion: 0.26
Nodes (11): _client(), POST /assistant/navigation/resolve — opaque nav handle → in-app destination…, project_id travels in the body (invisible to the route-tenancy walker, like…, test_401_when_unauthenticated(), test_body_validation(), test_model_read_gate_denial_is_403(), test_resolve_requires_project_access(), deny() (+3 more)

### Community 485 - "test_pane_session_visibility.py"
Cohesion: 0.20
Nodes (13): _memory_store(), _mint(), fixture, B-4: listing and individually revoking pane (Revit) sessions. Makes "which…, An expired-but-not-yet-swept record must not appear — otherwise the UI offers a…, Scoping is by construction: the scan filters on user BEFORE comparing…, test_cannot_revoke_someone_elses_session(), test_expired_records_are_not_listed() (+5 more)

### Community 486 - "test_relationships_singleflight.py"
Cohesion: 0.13
Nodes (13): fixture, OD2 Phase 1a — single-flight on the relationship fetch.…, N-5: the single-flight lock for a key must survive even if that key's cache…, refresh_model used to hand-roll `for k in list(_RELATIONSHIPS_CACHE): if…, Refreshing a model with nothing cached evicts nothing (the count the log line…, N-5 preserved: bulk eviction must not yank a single-flight lock that a caller…, N-6: every cache write must honor the bound. The warm-probe path…, router() (+5 more)

### Community 487 - "test_row_locks_groups_change_sets.py"
Cohesion: 0.18
Nodes (14): change_set_row(), group_row(), _nowait_refused(), fixture, Row-lock pins for the 2026-09-16 reliability sweep (Track F F1/F2). DB lane…, Source-level: every state-transition handler passes for_update=True and the…, Source-level twin of the pin above for record_edit_log, which does NOT use…, True when another session cannot lock the row right now (55P03). (+6 more)

### Community 488 - "section_for_category"
Cohesion: 0.14
Nodes (14): Return the CSI section number for a Revit category, or None. Uses Wave 4.9's…, section_for_category(), test_curtain_wall_mullions_same_section(), test_section_for_lighting(), test_section_for_plumbing(), test_section_for_unknown_category(), test_section_map_batch2(), test_section_map_batch3() (+6 more)

### Community 489 - "test_circuit_readability_eval.py"
Cohesion: 0.14
Nodes (7): skipif, Live, key-gated, REPORT-ONLY circuit-readability eval (owner regression…, Keyless drift guard, same pattern as the nl_filter eval: the pinned model…, Keyless contract check on the frozen fixture: circuit 19 rows with distinct…, test_fixture_is_well_formed(), test_live_eval_runs_and_reports(), test_pinned_model_matches_production()

### Community 490 - "test_aec_token_refresh_classification.py"
Cohesion: 0.23
Nodes (13): aec_client(), _http_status_error(), _patch_token_raises(), prewarm_worker(), Exception, fixture, Regression: a failed token refresh must not leak as a bare 500 out of the AEC…, test_gql_dead_token_400_is_auth_kind() (+5 more)

### Community 491 - "_FakeSession"
Cohesion: 0.14
Nodes (7): _FakeSession, The one request session the assembler threads everywhere (FU4). Counts…, B2: the assembler consults only the firm-scoped ModelIndex listing (names +…, FU4: one request session for the whole assembly; B1/B2 fail-closed edges., test_navigation_assembler_emits_opaque_handles_never_urns(), test_navigation_assembler_uses_one_session_and_fails_closed(), _wire_assembler()

### Community 492 - "_IndexedHubQuery"
Cohesion: 0.14
Nodes (5): _IndexedHubQuery, ``ModelIndex`` only: the indexed-hub fallback ``_indexed_hub_id`` uses when…, Just enough of a Query to answer the ``_indexed_hub_id`` probe (review pass-7…, A minimal attribute bag standing in for one ORM row., _Row

### Community 493 - "ht"
Cohesion: 0.14
Nodes (11): _Aps, _fresh_discovery_caches(), ht(), fixture, Fake APS: hubs per token; project→hub map; optional refusal status., test_flag_off_never_calls_the_user_path(), _body(), test_no_firm_state_is_ever_consulted() (+3 more)

### Community 494 - "test_personal_workspace_migration_downgrade.py"
Cohesion: 0.27
Nodes (12): _executed_sql(), _load(), c7d8e9f0a1b2 downgrade retention guard (slice 5, 2026-09-04). The approved…, Slice 6: count + DDL are one atomic decision under ACCESS EXCLUSIVE, so a…, LOCK TABLE must never name a missing table (that would abort the downgrade),…, _run_downgrade(), test_downgrade_refuses_while_personal_conversations_exist(), test_downgrade_refuses_while_personal_usage_rows_exist() (+4 more)

### Community 495 - "test_switchboard_distribution_endpoint.py"
Cohesion: 0.34
Nodes (13): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/switchboard_schedule and GET…, test_distribution_schedule_200_happy_path(), test_distribution_schedule_disallowed_project_returns_403(), test_distribution_schedule_no_match_returns_empty(), test_distribution_schedule_only_distribution_family_in_output(), test_distribution_schedule_upstream_error_returns_502() (+5 more)

### Community 496 - "fixture"
Cohesion: 0.14
Nodes (11): authed(), cleanup(), client(), consent_env(), db(), _env(), model_index_cleanup(), fixture (+3 more)

### Community 497 - "test_transformer_endpoint.py"
Cohesion: 0.26
Nodes (13): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/transformer_schedule endpoint contract. Mirrors…, Happy path: 200, transformers list, versionNumber stamp., Only Electrical Equipment whose familyName contains 'transformer' is assembled;…, The family-name parser's output reaches the row payload., A model with no transformers → empty transformers list, zero totals., test_transformer_schedule_200_happy_path() (+5 more)

### Community 498 - "test_version_check_worker.py"
Cohesion: 0.25
Nodes (13): _cleanup(), _fake_tip(), _job_status(), _jobs_for_version(), fixture, QA-D2 (2026-07-10 audit) — real behavioral tests for aec.version_check_worker.…, QA-D1: the worker used to call prewarm.enqueue() directly — a bare INSERT ...…, G2 (PDP Slice 0): the worker now re-checks the borrowed sid's firm→hub grant… (+5 more)

### Community 499 - "test_change_set_events_pure.py"
Cohesion: 0.18
Nodes (11): action_for_transition(), _metadata(), Any, The lifecycle verb that moves ``old_status`` to ``new_status``, or raise., _check_literal_set(), parametrize, Pure-lane pins for aec/change_set_events.py (Phase 13 lifecycle outbox). No DB:…, test_every_lifecycle_edge_has_exactly_one_verb() (+3 more)

### Community 500 - "test_aps_dead_lineage.py"
Cohesion: 0.36
Nodes (12): _is_dead_lineage(), _live_item(), WINCHESTER-STALE-LINEAGE-LINK — `list_all_rvts` must not emit dead lineages.…, A normal, openable .rvt lineage: non-Deleted extension + a tip version., test_absent_relationships_block_is_NOT_dead(), test_absent_tip_relationship_is_NOT_dead(), test_deleted_extension_colon_form_is_dead(), test_deleted_extension_dot_form_is_dead() (+4 more)

### Community 501 - "test_authz_child_filtering.py"
Cohesion: 0.19
Nodes (12): Phase 3 (plan v3 §7b.8) — per-child EGRESS filtering for /aps browse lists.…, Make _authz_gate_item_visible deny anything not in `visible_ids` (ENFORCE-like)., Gate returns True for every id (OFF/SHADOW) → the list is returned unchanged., An APS anomaly with no id has no resource identity to hide → passed through…, Must return a NEW list and never mutate the caller's (cached) list in place —…, The cache poisoning guard, expressed behaviourally: filtering the SAME source…, _stub_gate(), test_enforce_drops_denied_children() (+4 more)

### Community 502 - "test_authz_live_read_resume_enforce.py"
Cohesion: 0.44
Nodes (12): _client(), _decisions(), _projection(), Phase 15c T5 (isolated lane): the live-read resume endpoint under the shared…, The assistant router is mounted on the main app only behind…, _resume(), _seed_pending(), test_enforce_denies_resume_without_projection_and_never_runs_turn() (+4 more)

### Community 503 - "_ns"
Cohesion: 0.17
Nodes (13): _boom(), _ns(), W4 sec-fix F5: only the reason's length and a sha256 prefix reach the log., test_cli_explicit_sid_with_actor_runs_on(), test_cli_explicit_sid_without_actor_is_blocked_on(), test_cli_gate_blocked_exit_is_configurable(), test_cli_gate_flag_off_is_a_no_op(), test_cli_gate_on_registered_actor_proceeds_and_never_logs_the_reason_text() (+5 more)

### Community 504 - "_instrument_gates"
Cohesion: 0.21
Nodes (13): _instrument_gates(), _ceiling(), _hub(), _owned(), _read(), _step(), parametrize, Record every read-gate step in call order and optionally make one step refuse. (+5 more)

### Community 505 - "test_guard_emergency_deny.py"
Cohesion: 0.27
Nodes (12): _call(), _denial(), fixture, Pure tests for break-glass emergency-deny wiring in the derived-read guard…, Force the projection to ALLOW (so any block is provably the emergency path),…, test_empty_firm_id_normalizes_to_none_on_emergency_audit_row(), test_flag_off_never_runs_emergency_lookup(), test_flag_on_lookup_error_fails_closed() (+4 more)

### Community 506 - "_FakeQuery"
Cohesion: 0.15
Nodes (4): _FakeQuery, _OwnersQuery, Ignores the actual filter/columns; returns preconfigured count + rows so both…, Fake for the tenancy-ownership query: db.query(ModelVersion.project_id)…

### Community 507 - "test_issues_probe_route.py"
Cohesion: 0.22
Nodes (10): probe_app(), install(), fixture, parametrize, HTTP surface of the R1 issue-join probe (aec/issues_probe router).…, test_other_upstream_failures_become_a_labelled_502(), test_required_query_params_are_declared(), test_success_passes_the_probe_verdict_through() (+2 more)

### Community 508 - "test_nl_filter_contract_boundary.py"
Cohesion: 0.23
Nodes (11): _call(), model(), parametrize, POST /data/nl_filter — post-model translation boundary (deterministic).…, Fake the async client; `model["raw"]` is what the model 'returns'., `column_values` (grounding vocabulary) is client-supplied too; a key there that…, test_column_values_keys_do_not_widen_the_field_allowlist(), test_in_contract_output_passes_through_unchanged() (+3 more)

### Community 509 - "test_schedule_pool_coverage.py"
Cohesion: 0.26
Nodes (12): _categories_missing_from_pool(), _literal_block(), _pool_categories(), _quoted(), SCH-H1 guard (2026-07-01 audit): every category a pool-schedule endpoint…, Text of the bracketed literal following the first `marker` (balanced on the…, The full warm-pool category union, parsed from source (mirrors the runtime…, (rule_id, category) pairs whose category isn't in the warm pool.… (+4 more)

### Community 510 - "test_search_preparing.py"
Cohesion: 0.40
Nodes (12): _call_search(), _cleanup(), _has_failed(), _job_count(), OD2 Phase 4.3 — non-blocking /search/elements contract. The cold first-ever…, _setup(), test_cold_miss_enqueues_one_job_with_sid_and_returns_preparing(), test_cold_miss_with_a_failed_job_reclaims_it_for_retry() (+4 more)

### Community 511 - "test_change_set_outcome_summary_pure.py"
Cohesion: 0.24
Nodes (11): Server-side Apply summary for one set, from the latest recorded outcome of each…, summarize_outcomes(), parametrize, Phase 13 Stage 2: summarize_outcomes — the server-derived Apply summary. Pure., Review F1: whatever the lifecycle status, the state is implied by the counts., Review R5: summarize_outcomes emits exactly OUTCOME_SUMMARY_STATES — every…, test_emitted_states_are_exactly_the_declared_vocabulary(), test_every_non_applied_recorded_status_counts_as_failed() (+3 more)

### Community 512 - "main"
Cohesion: 0.17
Nodes (12): main(), Every exposed raw param name per category — the ground truth for fixing a…, The wanted-column config for a wave (the --dry-run view; no auth)., Lowest-risk wave (per _BUILD_ORDER) whose discipline has >=1 model present.…, Resolve a lineage/file URN to its tip elementGroup id (the `model_urn` the AEC-…, recommend_pilot_wave(), render_config_markdown(), render_param_dump() (+4 more)

### Community 513 - "normalize_domain"
Cohesion: 0.23
Nodes (11): DomainInvalid, normalize_domain(), ValueError, Email-domain normalization for firm domain claims (Phase 6 Client-Mgmt E).…, The supplied text is not a usable, bare email domain. The message is user-safe…, Return the canonical lowercase ASCII form of ``raw`` or raise DomainInvalid.…, parametrize, test_domain_invalid_message_never_echoes_input() (+3 more)

### Community 514 - "request_context.py"
Cohesion: 0.24
Nodes (10): _Headers, new_request_id(), Token, Per-request correlation id (W7.1a). Before Wave 7 no request-id middleware…, ``raw`` when it is a safe opaque token, else ``None`` (caller mints a fresh id)., Bind a request id for the duration of ``call_next`` and echo it on the response., request_id_middleware(), reset_request_id() (+2 more)

### Community 515 - "has_spec_library"
Cohesion: 0.17
Nodes (12): has_spec_library(), True if a clause library exists for this category (drives the FE button)., test_has_library_batch2(), test_has_library_batch3(), test_has_library_batch4(), test_has_library_batch5(), test_has_library_batch6(), test_has_library_batch7() (+4 more)

### Community 516 - "_check_cross_firm_sharing_proxy_safety"
Cohesion: 0.38
Nodes (11): _check_cross_firm_sharing_proxy_safety(), R18-PROXY-MODE-FAIL-CLOSED: refuse to boot when cross-firm sharing is ON while…, _clear(), R18-PROXY-MODE-FAIL-CLOSED: the boot guard refuses to serve when cross-firm…, test_canonical_proxy_off_overrides_legacy_on(), test_legacy_proxy_alias_still_satisfies_the_guard(), test_sharing_disabled_boots_regardless_of_proxy(), test_sharing_on_proxy_off_raises_dev() (+3 more)

### Community 517 - "State"
Cohesion: 0.18
Nodes (5): main(), Any, Everything the fake knows, guarded by one lock. Deliberately tiny and explicit:…, A dead identity: every token the user holds is refused, refresh included., State

### Community 518 - "test_scenario_cross_firm_share.py"
Cohesion: 0.29
Nodes (10): _base(), _download_class(), _firm(), UUID, Scenario — a project shared across firms, from grant to revoke. DB lane, real…, Platform admin creates a firm + domain; each person signs in on the domain and…, _search(), _share_rows() (+2 more)

### Community 519 - "test_assistant_error_sanitized.py"
Cohesion: 0.26
Nodes (7): _Block, _collect(), FakeClient, FakeMessages, _msg(), P1-alpha: a failing tool's exception text (which can carry SQL fragments, file…, test_tool_failure_error_is_sanitized()

### Community 520 - "test_auth_status_resilience.py"
Cohesion: 0.29
Nodes (11): _http_status_error(), _patch_token_raises(), Exception, fixture, Perp-audit PLAT-3 — /auth/status must not destroy a valid session on a…, spies(), test_clears_session_on_invalid_grant_400(), test_clears_session_on_invalid_grant_401() (+3 more)

### Community 521 - "world"
Cohesion: 0.17
Nodes (6): _Bytes, Both firms, both projects, proxy mode on, share row for PROJ_B (granted with…, C2 binding intact under ON: a token for PROJ_A/ITEM_A is not honoured for…, test_viewer_bearer_minted_for_one_model_does_not_stream_another_under_on(), _session_or_bearer(), world()

### Community 522 - "wiring"
Cohesion: 0.18
Nodes (8): layer1(), fixture, Route the /revert call through the REAL revert_parameter_change (role + flag +…, Role gate passes, the firm-side decision is a recording stub (allow unless told…, real_revert_spine(), wiring(), _load(), _row()

### Community 523 - "test_conftest_router_skip_detector.py"
Cohesion: 0.24
Nodes (10): conftest(), _dec(), fixture, Pin for the stale-router-skip detector in conftest.py (2026-09-16 sweep, S7).…, The tests/conftest.py plugin object (not importable by name under pytest)., test_db_lane_router_skip_becomes_failure(), test_legacy_wording_is_also_caught(), test_only_setup_phase_and_only_skips() (+2 more)

### Community 524 - "test_groups_views_404_oracle.py"
Cohesion: 0.24
Nodes (11): _assert_pair_hidden(), foreign_rows(), _make_deliverable(), fixture, SEC-GROUPS-VIEWS-404-EXISTENCE-ORACLE (2026-08-07) — status-code parity.…, A firm-B group and view on the allowlisted test project — probing them as the…, The oracle test proper: both probes must be indistinguishable., test_delete_group_pair() (+3 more)

### Community 525 - "_download_class"
Cohesion: 0.23
Nodes (12): _assert_download_denied(), _assert_private_no_store(), _download_class(), No share row at all (sharing flag ON): project B is simply foreign., _set_scope(), _share_view_only_detail(), test_cached_download_bytes_hit_and_304_are_private_no_store(), test_download_class_responses_are_private_no_store() (+4 more)

### Community 526 - "test_probe_origin_anomaly.py"
Cohesion: 0.29
Nodes (7): _el(), _page(), Dry-run coverage for backend/scripts/probe_origin_anomaly.py (origin-anomaly…, test_classify_inherent_when_affected_all_none_and_control_healthy(), test_classify_transient_when_affected_gained_origins(), test_dry_run_transient_fixture(), test_extract_distinguishes_none_from_absent()

### Community 527 - "test_receptacle_endpoint.py"
Cohesion: 0.30
Nodes (11): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/receptacle_schedule endpoint contract. Mirrors…, Happy path: 200, receptacles list, versionNumber stamp., Only Electrical Fixtures category elements are assembled; other categories…, A model with no Electrical Fixtures → empty receptacles list, zero totals., test_receptacle_schedule_200_happy_path(), test_receptacle_schedule_disallowed_project_returns_403() (+3 more)

### Community 528 - "test_relationships_memory.py"
Cohesion: 0.20
Nodes (10): _patch_tip(), fixture, GA-H3 (2026-06-09 audit) — assembled-relationships blobs: memory + event-loop…, _fetch_all_elements_for_relationships' _compute: both the durable-tier read and…, One entry can be a whole model's element set (hundreds of MB on the firm's…, _load_warm_relationships durable read: deserializing the hundreds-of-MB JSONB…, router(), test_cache_cap_defaults_to_three() (+2 more)

### Community 529 - "assistant_context.py"
Cohesion: 0.25
Nodes (10): _assemble_navigation_context(), _project_name(), Assistant project context — policy-brokered, fail closed (D1–D5, 2026-09-13).…, Candidate models the caller may navigate to: SQL-scoped to ``hub_ids``, capped…, project_navigation assembler — emits ONLY PROJECT_NAVIGATION_ALLOWLIST facts.…, Server-side inverse of the wayfinding block: the ModelChoice a handle names, or…, resolve_navigation_handle(), _scoped_models() (+2 more)

### Community 530 - "preview_current_parameter_value"
Cohesion: 0.22
Nodes (8): preview_current_parameter_value(), Re-read the element's CURRENT live value straight from Revit, to anchor the…, Pull the target document_title + element category out of the request selection…, Best-effort CURRENT live value for the approval card's before/after display…, _read_live_parameter_value(), _require_write_context(), preview_current_parameter_value is display-only and best-effort: ANY failure…, TestPreviewCurrentParameterValue

### Community 531 - "test_change_set_history_event_pure.py"
Cohesion: 0.33
Nodes (10): _approval_display_reason(), _history_event(), The user's own approval reason from a stored approve-row reason: the bare…, One status-history row for display. ``approval_is_self`` is the set's PERSISTED…, parametrize, Phase 13 review R1/R4: how one status-history row is presented by the history…, _row(), test_approval_is_self_is_the_persisted_marker_not_actor_equality() (+2 more)

### Community 532 - "TxtResolver"
Cohesion: 0.20
Nodes (8): default_resolver(), DnsPythonResolver, All TXT strings at ``name``; ``[]`` when the name or record does not exist;…, Production resolver over dnspython. Imported lazily on first use., TxtResolver, Dependency seam: tests override this to inject a fake resolver., _resolver(), Protocol

### Community 533 - "firm_docs/extract.py"
Cohesion: 0.27
Nodes (9): _extract_docx(), _extract_pdf(), _extract_xlsx(), ExtractionError, Exception, Per-type extraction of uploaded documents to normalized markdown text. Owner-…, Extraction failed; str(exc) is a client-readable reason., PDF with no usable text layer (scanned/image-only). (+1 more)

### Community 534 - "integrations/policy.py"
Cohesion: 0.25
Nodes (9): assert_integration_admitted(), IntegrationAdmissionDenied, _log_denial(), Exception, Session, UUID, Admission policy for Phase 17 integrations — the single fail-closed choke point…, Typed refusal from assert_integration_admitted. `code` is the machine code from… (+1 more)

### Community 535 - "generate_xlsx"
Cohesion: 0.20
Nodes (10): _cell_value(), generate_xlsx(), Wave 5 — XLSX export engine. Wraps xlsxwriter (BSD-2) for the synchronous <…, Build an XLSX workbook in memory and return the raw bytes. Numeric cells use…, Numeric fields in format_specs must be written as real number cells., Grouped output produces more rows than ungrouped (group header rows added)., test_generate_xlsx_grouped_has_multiple_rows(), test_generate_xlsx_numeric_cell_not_string() (+2 more)

### Community 536 - "e6b2d8f1a9c3_phase9_product_identity_integrity.py"
Cohesion: 0.44
Nodes (10): _check_names(), downgrade(), _insp(), _nullable(), Phase 9 — product identity integrity (owner policy 3, 2026-09-24). Ingestion…, _refuse_if_keyed_identity_violated(), _refuse_if_null_manufacturer_rows_exist(), _set_source_fk() (+2 more)

### Community 537 - "_run"
Cohesion: 0.20
Nodes (10): W4 sec-fix F1: entitlement is a ceiling, never a substitute — an entitled user…, _run(), test_current_user_scope_carries_token_expiry(), _body(), test_current_user_scope_fails_closed_without_a_user_id(), _body(), _resolve(), test_flag_on_read_is_the_users_autodesk_access_intersected_with_the_firm() (+2 more)

### Community 538 - "test_data_routes_require_hub_id.py"
Cohesion: 0.31
Nodes (8): _params(), _patch(), fake_token(), BUG-SHARED-PROJECT-MODEL-PAGE-NO-HUB-ID (2026-09-13) — /data/elements and…, test_categories_empty_hub_id_is_422(), test_elements_empty_hub_id_is_422_not_preparing(), test_elements_missing_hub_id_is_422(), test_elements_non_empty_hub_id_still_reaches_resolver()

### Community 539 - "test_element_counts_endpoint.py"
Cohesion: 0.44
Nodes (9): _call(), F5 — /aps element-counts: badges for unprocessed .rvt files. The file browser…, _setup(), test_aec_error_degrades_to_null_without_aborting_batch(), test_cached_model_returns_count_without_live_fetch(), test_live_fetch_cap_bounds_upstream_calls(), test_uncached_model_fetches_and_sums(), test_untranslated_model_is_null() (+1 more)

### Community 540 - "test_hub_id_query_min_length.py"
Cohesion: 0.24
Nodes (8): _hub_id_query_fields(), _min_length(), Every required ``hub_id`` query parameter rejects the empty string (422). #663…, Every ``hub_id`` query ModelField in the resolved dependency graph., End-to-end on one route that only gained ``min_length=1`` here (the…, test_empty_hub_id_is_422_on_a_route_constrained_by_this_sweep(), test_every_required_hub_id_query_param_rejects_empty(), _walk()

### Community 541 - "test_migration_firm_doc_capability_live_unique.py"
Cohesion: 0.36
Nodes (10): _index_names(), _load(), fixture, Wave 4 C3 — migration e5f6a7b8c9d1 (live firm-doc capability unique index),…, _rows(), _run(), scratch_conn(), _seed() (+2 more)

### Community 542 - "test_provider_tool_use_is_refused_closed"
Cohesion: 0.25
Nodes (7): _Block, _FakeClient, _Resp, test_provider_request_carries_no_tools(), test_provider_tool_use_is_refused_closed(), _Usage, _build()

### Community 543 - "_chat"
Cohesion: 0.24
Nodes (9): _chat(), _events(), parametrize, test_firm_scope_denied_before_credential(), test_missing_key_is_credential_unavailable_no_fallback(), test_own_conversation_resumes_and_lists(), test_provider_error_yields_error_row_and_no_fallback(), __init__() (+1 more)

### Community 544 - "test_tip_cache.py"
Cohesion: 0.29
Nodes (10): _clear_tip_cache(), _fake_gql(), fixture, Wave 4.6.5 Session 2 — version-probe TTL cache tests (aec/client.py).…, test_concurrent_misses_collapse_to_one_probe(), test_distinct_keys_probe_independently(), test_expired_entry_reprobes(), test_failure_is_not_cached() (+2 more)

### Community 545 - "assistant_schemas.py"
Cohesion: 0.27
Nodes (8): live_read_enabled(), all_tools_for_state(), live_read_tools_for_state(), Native Claude tool definitions for the Phase 4a read-only assistant + system-…, The live-read tool, offered only when BIMPOSSIBLE_ASSISTANT_LIVE_READ_ENABLED…, Write tools offered to the model this turn. The saved-view write tools are…, Full tool catalog for a normal (non-help-only) turn, honoring the live-write…, write_tools_for_state()

### Community 546 - "aadf3ce41b1c_user_roles_firm_scoped_pk.py"
Cohesion: 0.31
Nodes (9): downgrade(), _primary_key(), UUID, user_roles primary key becomes (user_uuid, firm_id) — firm-scoped roles (W5…, (constraint name, key columns in key order); (None, ()) when there is no…, (reason, removed-row values, audit target) for every row the C3 cascade would…, _stale_rows(), upgrade() (+1 more)

### Community 547 - "c7d8e9f0a1b2_add_personal_workspace.py"
Cohesion: 0.33
Nodes (9): _count(), downgrade(), _has_column(), _has_table(), PersonalDataPresent, RuntimeError, Model routing slice 4: isolated personal BYOK workspace. 1.…, Raised by downgrade() instead of deleting personal rows. (+1 more)

### Community 548 - "_make_client"
Cohesion: 0.29
Nodes (8): pytestmark_api, _make_client(), test_admin_integrations_require_auth(), test_admin_list_integrations_merges_defaults(), test_admin_list_reflects_disabled_row(), test_admin_put_invalid_status_422(), test_admin_put_records_admin_identity(), test_admin_put_unknown_kind_404()

### Community 549 - "_PureLaneSessionStub"
Cohesion: 0.20
Nodes (4): _PureLaneDbSessionStub, _PureLaneSessionStub, Attribute sink standing in for sys.modules['db.session']. `from db.session…, Stands in for a session/connection SessionLocal()/get_db() returns. Supports…

### Community 551 - "test_groups_views_personal_samefirm_existence_oracle.py"
Cohesion: 0.31
Nodes (9): _assert_pair_hidden(), colleague_personal_group(), colleague_personal_view(), fixture, SEC-GROUPS-VIEWS-PERSONAL-SAMEFIRM-EXISTENCE-ORACLE (2026-08-22) — status-code…, test_delete_group_personal_samefirm_pair(), test_delete_view_personal_samefirm_pair(), test_patch_group_personal_samefirm_pair() (+1 more)

### Community 555 - "test_synthetic_load_host_guard_pure.py"
Cohesion: 0.27
Nodes (8): hg(), _no_override(), fixture, parametrize, CQ-SYNTH-HOST-ENV-1 guard, dependency-free (Wave 3 D).…, test_loopback_hosts_are_accepted(), test_non_loopback_or_unparseable_hosts_refuse_to_start(), test_only_exact_one_opts_into_a_remote_host()

### Community 556 - "TxtLookupError"
Cohesion: 0.25
Nodes (6): Exception, The resolver could not answer (timeout, SERVFAIL, no network). Distinct from…, TxtLookupError, FakeResolver, Programmable TXT resolver. ``answers`` maps record name → list[str]; ``fail``…, resolver()

### Community 557 - "generate"
Cohesion: 0.31
Nodes (8): RSAPrivateKey, generate(), _key(), main(), _name(), Path, A throwaway certificate authority for the simulation's fake Autodesk. The…, Write ``ca.pem``, ``server.pem`` and ``server.key`` into *out_dir*. Returns the…

### Community 558 - "revit_link/conftest.py"
Cohesion: 0.36
Nodes (8): _install_stubs(), _make_aiohttp_stub(), _make_aps_auth_stub(), _make_fastapi_stub(), _make_pydantic_stub(), _make_sqlalchemy_stub(), Pytest stubs for backend packages not installed in the host Python environment.…, Build a minimal SQLAlchemy-shaped stub tree.

### Community 559 - "_FakeAsyncClient"
Cohesion: 0.22
Nodes (3): _FakeAsyncClient, _FakeResp, Stands in for httpx.AsyncClient inside the callback: token exchange succeeds,…

### Community 560 - "test_authz_audit_firmid_normalization.py"
Cohesion: 0.36
Nodes (8): _capture(), parametrize, AUTHZ-AUDIT-FIRMID-EMPTY-ROOTCAUSE — the two Track-2 read-audit producers must…, Patch record_decision where _record_read looks it up (imported lazily from…, test_artifacts_real_firm_round_trips(), test_artifacts_unresolved_firm_becomes_null(), test_track2_content_real_firm_round_trips(), test_track2_content_unresolved_firm_becomes_null()

### Community 562 - "_Autodesk"
Cohesion: 0.28
Nodes (5): _Autodesk, Take away the firm side only (Autodesk still answers yes)., Answers the hub list and single-project probe for whichever user is bound NOW., Stands in for autodesk_first_reads.assert_user_can_see_item (its own suites…, _revoke_firm()

### Community 563 - "test_backfill_apply_guard.py"
Cohesion: 0.22
Nodes (3): fixture, Pure tests for the Option B guard on scripts/backfill_authz_projection.py…, script()

### Community 564 - "_BurnStore"
Cohesion: 0.22
Nodes (6): burn(), _BurnStore, fixture, Stands in for identity_link_states. Records outcomes so a test can assert…, Stub everything outside the router: identity, config, JWKS, and the burn store., _wiring()

### Community 565 - "test_smoke_boot.py"
Cohesion: 0.31
Nodes (8): _client(), Smoke test — the app boots and its core anonymous surface answers. Not a…, App imports, routers mount, and the unauthenticated identity probe answers. A…, The login poll the frontend hits on every page load before sign-in. A 401/403…, /health pings the database; in the DB lane Postgres is up, so it must be 200. A…, test_app_boots_and_whoami_answers(), test_auth_status_anonymous_is_200_not_401(), test_health_reports_db_reachable()

### Community 567 - "BuildingTypesTests"
Cohesion: 0.22
Nodes (3): BuildingTypesTests, Pure-lane tests for ``wizard.templates``. Stdlib ``unittest`` only — no pytest,…, Forma building-type vocabulary for the Project Setup Wizard (Phase 8).…

### Community 568 - "c4e7a2b91d38_staged_change_family_type_target.py"
Cohesion: 0.54
Nodes (7): downgrade(), _has_column(), _has_constraint(), _has_index(), _has_unique_constraint(), Write Engine Increment 2 — family-TYPE targeting (String-only) Adds…, upgrade()

### Community 569 - "worker_urls"
Cohesion: 0.29
Nodes (7): Per-worker isolation for the pytest-xdist pilot (2026-09-01, runtime-reduction…, _xdist_worker_urls(), Per-worker isolation naming for the pytest-xdist shadow lane (runtime-reduction…, ``gwN`` -> ``N``; anything else is a hard error (never silently share a…, Per-worker DATABASE_URL / REDIS_URL derived from the lane's base URLs., worker_index(), worker_urls()

### Community 570 - "test_aec_module_identity.py"
Cohesion: 0.32
Nodes (7): _module_identity_mismatches(), Module-identity invariant for the `aec` package (2026-09-02, Phase 4 xdist…, Return one line per `aec.*` submodule whose sys.modules entry and parent-…, After collection, `sys.modules['aec.<x>']` and `aec.<x>` must be the same…, Self-check: reproduce the historical condition in isolation (pop a pure…, test_aec_submodules_share_one_identity(), test_detector_catches_a_stale_parent_attribute()

### Community 571 - "_PolicyStore"
Cohesion: 0.25
Nodes (4): _PolicyStore, SEC-1/CHAIN-2: two firms on one shared hub, one project, independent policies.…, A session that REALLY honours the (firm_id, project_id) filter. SEC-1: a…, test_resolve_policy_is_firm_scoped()

### Community 572 - "test_assistant_check_model_health.py"
Cohesion: 0.43
Nodes (7): _call(), _cleanup(), _ctx(), Phase 11 — check_model_health assistant tool (DB-lane). Mirrors test_qa_router:…, _setup(), test_check_model_health_cold_returns_preparing(), test_check_model_health_warm_returns_compact_summary()

### Community 573 - "_resume"
Cohesion: 0.25
Nodes (8): _resume(), test_injection_text_survives_only_as_clamped_data(), test_pretrim_drops_overflow_rows_before_validation(), test_pretrim_leaves_underlimit_rows_untouched(), test_resume_error_shape_and_clamps(), test_resume_exactly_one_of_result_error(), test_resume_result_roundtrip_and_clamps(), test_resume_row_cap_forces_truncated()

### Community 574 - "test_chat_exhausted_budget_downgrades_and_says_so_on_the_wire"
Cohesion: 0.25
Nodes (8): _events(), The slice-3 SSE contract: `model_routed` is the FIRST event of every stream,…, O-4 end to end: an exhausted user budget downgrades a platform turn to the…, L-3 web disclosure: when the plan entitlement read degrades, an EXPLICIT pick…, test_chat_announces_routing_before_any_content(), test_chat_degraded_plan_read_announces_plan_degraded_not_budget(), test_chat_exhausted_budget_downgrades_and_says_so_on_the_wire(), test_chat_soft_warning_announces_without_changing_the_model()

### Community 575 - "test_chat_threads_one_session_through_the_preflight_and_three_firm_reads"
Cohesion: 0.25
Nodes (8): Replace the firm-read collaborators with recorders of the `db` each is handed…, #4: the preflight guardrail and the three firm reads (credential, policy,…, #4 (companion): GET /assistant/models threads a single SessionLocal through its…, _record_firm_reads(), _stream_types(), test_chat_default_resolution_reaches_turn(), test_chat_threads_one_session_through_the_preflight_and_three_firm_reads(), test_models_threads_one_session_through_its_three_firm_reads()

### Community 576 - "test_assistant_query_edit_log.py"
Cohesion: 0.25
Nodes (4): _NullSession, Phase 7 audit-gate: query_edit_log assistant tool. Read-only tool: queries…, The handler must open its DB access via ctx.session(), matching every other DB-…, test_query_edit_log_uses_ctx_session()

### Community 577 - "_decide"
Cohesion: 0.29
Nodes (7): _decide(), Review L3: a project confirmed by the user's own hub listing or entitlement-…, test_listing_ceiling_records_proof_so_share_authority_serves_entitled_rows(), _listing_then_decide(), test_share_decision_on_abstains_without_the_grantees_layer1_proof(), _proved(), test_share_decision_on_unreadable_proof_fails_closed_off_unchanged()

### Community 578 - "test_migration_aec_schema_cache.py"
Cohesion: 0.39
Nodes (7): _load_migration(), F-8 — the aec_schema_cache migration must reconcile indexes, not just the…, Invoke the migration's upgrade() with a mocked op + inspector reporting the…, _run_upgrade_with(), test_cold_start_creates_table_and_both_indexes(), test_table_and_indexes_present_is_a_noop(), test_table_present_but_index_missing_is_reconciled()

### Community 580 - "test_security_batch_a.py"
Cohesion: 0.25
Nodes (3): Security remediation — Batch A behavioral tests (2026-05-30). Covers the…, test_nl_filter_requires_auth(), test_search_models_requires_auth()

### Community 581 - "test_security_c1_sessions.py"
Cohesion: 0.25
Nodes (3): auth(), fixture, SEC-C1 — per-request session isolation. Exercises the new session store +…

### Community 582 - "_NetworkFailThenDeleteFailsClient"
Cohesion: 0.25
Nodes (6): _make_job_with_upload(), _NetworkFailThenDeleteFailsClient, A planning job whose plan includes an upload (file) item. build_plan no longer…, Fails the file-upload create with a network-kind error (so the ledger still has…, WIZ-12 (2026-07-08 audit, found reviewing WIZ-2): rollback_result.failed is…, test_provision_network_failure_with_partial_rollback_reports_failed_with_orphan_list()

### Community 583 - "TransportPermanentError"
Cohesion: 0.33
Nodes (5): Exception, A transport's transient failure. ``code`` must be a short machine code;…, A transport's permanent refusal (bad destination, revoked install...)., TransportPermanentError, TransportRetryableError

### Community 584 - "test_handle_resolution_rechecks_current_policy"
Cohesion: 0.33
Nodes (6): AiContextPolicyLookup, NamedTuple, A resolved policy plus whether it was forced closed by a lookup FAILURE.…, SEC-6 (owner ruling 2026-09-14): a share-policy tightening takes effect…, test_handle_resolution_rechecks_current_policy(), _lookup()

### Community 585 - "3aa734cda334_model_routing_usage_ledger.py"
Cohesion: 0.71
Nodes (6): _col_exists(), downgrade(), _index_exists(), _insp(), _table_exists(), upgrade()

### Community 586 - "s9t0u1v2w3x4_add_cache_reconcile_state.py"
Cohesion: 0.57
Nodes (6): _columns(), downgrade(), _indexes(), Add cache-reconciliation state/log + model_versions.auth_fail_count APS-Lab R5…, _tables(), upgrade()

### Community 587 - "w3x4y5z6a7b8_fav_firm_key_and_enroll_index.py"
Cohesion: 0.48
Nodes (6): downgrade(), _index_names(), favorites cross-firm unique key + enrollment composite index Revision ID:…, Column list of the named unique constraint, or None if it's absent., upgrade(), _uq_columns()

### Community 588 - "test_auth_logout_csrf.py"
Cohesion: 0.29
Nodes (3): PLAT-9 — logout is a CSRF-protected POST; the forgeable GET is gone. The old…, The /auth/ exemption carve-out: an authenticated browser hitting logout WITHOUT…, test_post_logout_with_session_requires_csrf_token()

### Community 589 - "test_no_production_caller_declares_required"
Cohesion: 0.38
Nodes (7): ``share_authority``'s docstring states that the ``required <= VIEW`` ceiling is…, test_no_production_caller_declares_required(), _calls_by_scope(), walk(), _funcs(), _src(), _view_defaulted_params()

### Community 590 - "_events"
Cohesion: 0.29
Nodes (7): _events(), W5 P1F item 6: no raw firm/hub/project/job/user id and no free-text reason in…, test_blocked_log_carries_a_reason_code_and_hashed_ids_only(), test_cli_gate_on_blocks(), test_service_actor_on_registered_operation_allows_and_audits(), test_service_actor_on_unregistered_operation_blocks(), test_unclassified_blocks_on_and_is_legacy_off()

### Community 591 - "parametrize"
Cohesion: 0.43
Nodes (7): parametrize, _refusal_helper(), test_spike_off_is_legacy(), test_spike_on_with_registered_actor_runs(), test_spike_on_with_wrong_actor_is_refused(), test_spike_on_without_actor_is_refused(), test_unsafe_operations_are_granted_to_no_service_actor()

### Community 593 - "_body"
Cohesion: 0.29
Nodes (5): test_flag_on_autodesk_denial_is_final_no_share_no_grant(), _body(), _user_denied(), test_flag_on_write_denied_by_autodesk_even_with_firm_grant(), _body()

### Community 594 - "_body"
Cohesion: 0.29
Nodes (4): _body(), _user_ok(), test_flag_on_write_needs_autodesk_and_firm_capability(), _body()

### Community 595 - "_load"
Cohesion: 0.43
Nodes (3): _load(), SEC-SCRIPTS-PERF-1 (2026-08-04 audit): the synthetic-perf seed/teardown scripts…, SyntheticSeedGuardTests

### Community 596 - "test_support_fastpath.py"
Cohesion: 0.43
Nodes (6): _clear_index(), Session 5b — /data/support fast-path on model_index (perf). The files list…, A tombstoned (deleted_at set) supported row must NOT satisfy the fast-path —…, test_support_fastpath_ignores_tombstoned_rows(), test_support_fastpath_skips_tip_when_model_indexed(), test_support_probes_tip_when_not_indexed()

### Community 597 - "match_wave"
Cohesion: 0.40
Nodes (6): match_wave(), Match every schedule's columns against the exposed param names for that…, render_wave_markdown(), ScheduleResult, test_match_wave_returns_a_result_per_column(), test_render_markdown_contains_verdicts_and_schedule_names()

### Community 598 - "b7c8d9e0f1a2_cka_document_scope_classification.py"
Cohesion: 0.87
Nodes (5): downgrade(), _has_col(), _has_table(), _insp(), upgrade()

### Community 599 - "f5a6b7c8d9e0_add_phase3_10a_room_join_geometry_cache.py"
Cohesion: 0.60
Nodes (5): _column_exists(), downgrade(), Add Phase 3.10a cross-model room join geometry cache Per…, _table_exists(), upgrade()

### Community 600 - "l2m3n4o5p6q7_add_canonical_principals.py"
Cohesion: 0.60
Nodes (5): _column_exists(), downgrade(), Add canonical principals + identity_links + principal_admin_scopes (AUTH-INH…, _table_exists(), upgrade()

### Community 601 - "AST"
Cohesion: 0.60
Nodes (6): AST, _call_name(), _mounted_kind(), `app.include_router(<kind>_router)` -> kind., _readiness_kind(), test_main_logs_readiness_only_inside_the_enable_guard_after_mount()

### Community 602 - "test_models_uses_server_resolved_firm_id_never_a_client_supplied_one"
Cohesion: 0.33
Nodes (5): Tenant isolation (mirrors test_forged_firm_id_in_body_cannot_select_another_…, The firm is the one require_active_membership resolves from the session — a…, test_firm_model_policy_keyed_by_resolved_firm_id_never_the_forged_body_one(), _fake_policy(), test_models_uses_server_resolved_firm_id_never_a_client_supplied_one()

### Community 603 - "test_auth_issuer.py"
Cohesion: 0.47
Nodes (4): N-12: AUTH-2 issuer-enforcement coverage. auth_router.py verifies the Autodesk…, test_forged_issuer_is_rejected(), test_genuine_autodesk_issuer_is_accepted(), _token()

### Community 604 - "test_auth_roles_alias.py"
Cohesion: 0.33
Nodes (5): SEC-M4 smoke fix — `GET /auth/roles/me` alias (DB-lane). The Wave 6 permissions…, GET /auth/roles/me returns 200 with the caller's role record (not a 404)., The alias and the canonical /auth/me/roles return identical payloads., test_roles_me_alias_matches_canonical(), test_roles_me_alias_resolves()

### Community 606 - "_body"
Cohesion: 0.33
Nodes (4): W5 P1F item 2: flag on = require_hub_in_firm_allowed AND the user's own hubs., test_require_hub_visible_flag_on_needs_the_firm_grant_and_the_users_hubs(), _body(), _scope_()

### Community 607 - "test_prewarm_on_layer1_proof_from_job_one_is_not_visible_in_job_two"
Cohesion: 0.33
Nodes (5): _enqueue_version(), _stub(), Two jobs on ONE worker task (one asyncio context, as ``_worker_loop`` runs…, test_prewarm_on_layer1_proof_from_job_one_is_not_visible_in_job_two(), _stub()

### Community 608 - "test_cross_firm_share_detail_strings_frontend_pin.py"
Cohesion: 0.60
Nodes (5): _backend_details(), _frontend_keys(), Cross-side pin for the share error-detail contract (2026-09-16 discovery S10).…, test_every_backend_user_facing_detail_has_plain_language_copy(), test_every_frontend_matched_detail_is_still_emitted_by_the_backend()

### Community 609 - "test_env_example_documents_backend_env_names.py"
Cohesion: 0.53
Nodes (5): _documented(), _names_read_by_backend(), .env.example is the documented runtime-env contract; every name the backend…, test_allowlist_entries_are_still_read(), test_every_backend_env_name_is_in_env_example()

### Community 610 - "test_gunicorn_launch_config.py"
Cohesion: 0.60
Nodes (5): _flag_value(), _gunicorn_cmd(), Pins the gunicorn launch flags in backend/Dockerfile (pure lane, no DB).…, test_keep_alive_outlives_the_proxy_idle_window(), test_worker_timeout_unchanged_by_the_keepalive_fix()

### Community 611 - "test_redis_degraded_mode.py"
Cohesion: 0.33
Nodes (4): TST-NEW-1 / RE-NEW-1 (2026-06-29 + 2026-07-06 audits) — a genuinely unreachable…, PLAT-1 (2026-07-10 audit): the handler used to relabel EVERY RedisError…, test_non_transient_redis_error_logs_at_error_with_traceback(), test_redis_outage_during_session_resolution_returns_503()

### Community 612 - "_scoped_hubs"
Cohesion: 0.50
Nodes (5): The SERVER-RESOLVED hub set a navigation read may touch (B1). ``ModelIndex``…, _scoped_hubs(), _hub_env(), test_scoped_hubs_fails_closed_on_every_empty_input(), test_scoped_hubs_is_grant_intersect_cache_intersect_client()

### Community 613 - "contract.py"
Cohesion: 0.40
Nodes (3): IntegrationDescriptor, Adapter contract for Phase 17 integrations. An "integration kind" is one…, One integration kind as the control plane knows it.

### Community 614 - "1f7f44253c51_add_bimpossible_role_to_memberships.py"
Cohesion: 0.80
Nodes (4): _ck_exists(), _col_exists(), downgrade(), upgrade()

### Community 615 - "80af6ebc3df5_firm_scope_ai_context_policy.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_column(), Firm-scope the AI context policy: project_ai_context_policies (firm_id,…, upgrade()

### Community 616 - "9329a1e7be85_add_slack_gateway_bindings.py"
Cohesion: 0.60
Nodes (4): downgrade(), _exists(), Add Slack assistant gateway binding tables Backs the Slack Assistant Gateway…, upgrade()

### Community 617 - "9c9a59a39d64_staged_change_typed_values.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_constraint(), upgrade()

### Community 618 - "a4c123b1612d_add_firm_model_policy.py"
Cohesion: 0.70
Nodes (4): downgrade(), _insp(), _table_exists(), upgrade()

### Community 619 - "a7c1e93f4b28_add_teams_gateway_bindings.py"
Cohesion: 0.60
Nodes (4): downgrade(), _exists(), Add Microsoft Teams assistant gateway binding tables The Teams sibling of…, upgrade()

### Community 620 - "b24de6f81c35_edit_log_change_set_linkage.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 621 - "c7d2e9f4a1b6_drop_firm_aps_hub_id.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_column(), Drop the dead firms.aps_hub_id column (W9-INV-061 / Wave 8 inventory D7,…, upgrade()

### Community 622 - "d2e3f4a5b6c7_add_model_index_deleted_at.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 623 - "d5f8b3c41e27_revit_link_request_log_firm_id.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 624 - "e5f6a7b8c9d1_firm_doc_capability_live_unique.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_index(), One live firm-doc capability grant per (firm, user, capability) — partial…, upgrade()

### Community 625 - "j0k1l2m3n4o5_add_hub_access_scope_and_firm_allowed_projects.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_table(), upgrade()

### Community 626 - "n4o5p6q7r8s9_add_artifact_drafts_and_provenance.py"
Cohesion: 0.90
Nodes (4): _columns(), downgrade(), _table_exists(), upgrade()

### Community 627 - "q7r8s9t0u1v2_add_authz_decision_actor_type.py"
Cohesion: 0.80
Nodes (4): _columns(), downgrade(), _indexes(), upgrade()

### Community 628 - "r8s9t0u1v2w3_add_identity_link_states.py"
Cohesion: 0.80
Nodes (4): downgrade(), _indexes(), _tables(), upgrade()

### Community 629 - "z8a9b0c1d2e3_rename_assistant_digests_created_at.py"
Cohesion: 0.80
Nodes (4): _col_exists(), downgrade(), _index_exists(), upgrade()

### Community 630 - "_cipher"
Cohesion: 0.40
Nodes (5): _cipher(), _fernet_key_for(), MultiFernet, A urlsafe-base64 32-byte Fernet key derived from an arbitrary secret string., Build a MultiFernet from SID_CRYPTO_KEY (comma-separated secrets; first…

### Community 631 - "_clean_integration_env"
Cohesion: 0.40
Nodes (4): _clean_integration_env(), _no_network(), fixture, The endpoint reads the process environment; start every test from a known-empty…

### Community 632 - "_FakeBlock"
Cohesion: 0.40
Nodes (4): _FakeBlock, Stands in for an Anthropic SDK content block: attribute-addressed, not JSON-…, test_jsonsafe_state_flattens_sdk_blocks(), test_redis_store_pop_roundtrips_sdk_block_state()

### Community 634 - "test_auth_httpx_timeouts.py"
Cohesion: 0.40
Nodes (3): Source-level guard: every httpx client in the auth path carries an explicit…, N-16: stronger than 'not bare' — every httpx.AsyncClient(...) must pass an…, test_every_httpx_client_in_auth_path_sets_an_explicit_timeout()

### Community 635 - "_block_db_import"
Cohesion: 0.40
Nodes (5): _block_db_import(), test_backfill_off_parity(), test_backfill_on_apply_is_never_authorized(), test_backfill_on_dry_run_with_registered_actor_passes_the_gate(), test_backfill_on_without_actor_refuses_before_db()

### Community 636 - "fixture"
Cohesion: 0.40
Nodes (5): fixture, PROJ_C in HUB_C: tok-c's Autodesk account reaches it, the caller's firm holds…, ITEM_R lives in PROJ_A (which tok-own reaches) inside a folder tok-own cannot…, restricted(), ungranted()

### Community 638 - "_Boom"
Cohesion: 0.40
Nodes (5): _broken(), _Boom, RuntimeError, Stands in for what ``get_2legged_token`` really raises: httpx.TimeoutException…, tok()

### Community 639 - "test_logout_csrf.py"
Cohesion: 0.50
Nodes (4): _deleted_cookies(), P1-H — logout must clear the CSRF cookie alongside the session cookie. The…, Names of cookies the response deletes (Max-Age=0 / expired)., test_logout_clears_session_and_csrf_cookies()

### Community 640 - "test_redis_cutover_doc_targeted_recreate.py"
Cohesion: 0.60
Nodes (4): Pin: the Redis cutover guide never tells the operator to run a plain ``docker…, _read(), test_cutover_guide_has_no_plain_compose_up(), test_cutover_guide_uses_targeted_backend_recreate()

### Community 641 - "format_navigation_context"
Cohesion: 0.50
Nodes (4): format_navigation_context(), PURE formatter for the wayfinding block. Input is already allowlisted:…, test_navigation_block_contains_only_allowlisted_wayfinding_data(), test_navigation_block_is_none_without_models_and_caps_the_list()

### Community 642 - "_authenticate"
Cohesion: 0.50
Nodes (4): _authenticate(), The sid whose token the probe borrows. Explicit --sid, else --latest-session…, Bind a session sid so get_user_token() resolves for the probe's reads -- the…, _resolve_sid()

### Community 643 - "13014695175a_user_api_keys_and_account_audit_log.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 644 - "1f617e094d19_add_project_share_grants.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 646 - "a13cd5e70f24_change_set_applied_audit_fields.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 647 - "a5b6c7d8e9f0_constrain_integration_registration_status.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_constraint(), upgrade()

### Community 648 - "a9b8c7d6e5f4_add_assistant_parameter_proposals.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 649 - "b0c1d2e3f4a5_add_element_cache_origin_absent.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 650 - "b1c2d3e4f5a6_move_is_draft_to_membership.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has(), upgrade()

### Community 651 - "b5d234c2723e_add_firm_billing_timezone.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 652 - "c1d2e3f4a5b6_add_writeback_and_wizard_audit_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 653 - "c4d5e6f7a8b9_add_execution_started_at.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 654 - "c6d7e8f9a0b1_add_firm_onboarding_requests.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 655 - "d1b7e2a9c4f0_add_assistant_parameter_proposals_project_id.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 656 - "d5e6f7a8b9c0_add_model_versions_cached_at_index.py"
Cohesion: 0.83
Nodes (3): downgrade(), _index_exists(), upgrade()

### Community 657 - "d5f8b3c62e49_change_set_approval_reason.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 658 - "d8e9f0a1b2c3_add_client_budget_reservations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 659 - "e0f1a2b3c4d5_add_firm_allowed_hubs_and_project_hub_cache.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 660 - "e3f4a5b6c7d8_add_qa_history_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 661 - "e6f7a8b9c0d1_add_phase3_8_acc_role_sync.py"
Cohesion: 0.83
Nodes (3): _columns(), downgrade(), upgrade()

### Community 662 - "f13c5e70a0b1_add_change_set_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 663 - "f2b3c4d5e6f7_add_allowed_projects.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 664 - "f4a5b6c7d8e9_add_integration_registration.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 665 - "f7a8b9c0d1e2_add_is_firm_model_editor.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 666 - "h8i9j0k1l2m3_add_firm_documents.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 667 - "i9j0k1l2m3n4_add_share_snapshots.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 668 - "j0k1permproj_add_permission_projection.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 669 - "k1l2m3n4o5p6_add_authz_decision_log.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 670 - "m3n4o5p6q7r8_add_published_artifacts.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 671 - "o5p6q7r8s9t0_add_track2_content_grants.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 672 - "p6q7r8s9t0u1_add_emergency_deny_scopes.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 673 - "s1t2u3v4w5x6_add_phase5_persistence.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 674 - "t0u1v2w3x4y5_drop_allowed_projects.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 675 - "t2u3v4w5x6y7_add_provisioning_jobs.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 676 - "u1v2w3x4y5z6_add_r5_filter_observations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 677 - "w5x6y7z8a9b0_add_assistant_conversations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 678 - "x6y7z8a9b0c1_add_assistant_digests.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 681 - "test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once"
Cohesion: 0.50
Nodes (3): W9-INV-088: /revert checks the role exactly ONCE -- the spine's audited…, test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once(), _deny()

### Community 682 - "test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes"
Cohesion: 0.50
Nodes (3): test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes(), test_revert_on_preview_matching_project_reaches_the_live_read(), _live()

### Community 685 - "test_refresh_model.py"
Cohesion: 0.67
Nodes (3): N-13: guard the DERIV-1 fix against regression. DerivativeCache rows are keyed…, _refresh_model_body(), test_refresh_model_invalidates_by_derivative_urn_not_lineage()

### Community 686 - "kinds_without_config_contract"
Cohesion: 0.67
Nodes (3): kinds_without_config_contract(), Registered kinds lacking a contract — pinned empty by tests so a new kind…, test_every_registered_kind_has_a_config_contract()

### Community 720 - "test_live_duration_covers_the_model_calls_not_just_the_scoring"
Cohesion: 0.67
Nodes (3): The CLI makes the calls itself (so it can print the harness report) and then…, test_live_duration_covers_the_model_calls_not_just_the_scoring(), fake_run_suite()

### Community 723 - "parametrize"
Cohesion: 0.67
Nodes (3): parametrize, test_live_read_enabled_parses_like_write_flag(), test_tristate_projection_survives_dump()

### Community 724 - "test_with_reservation_settles_stream_error_and_stops_heartbeat"
Cohesion: 1.00
Nodes (3): test_with_reservation_settles_stream_error_and_stops_heartbeat(), _drain(), dying_events()

### Community 727 - "_Sentinel"
Cohesion: 0.67
Nodes (3): Exception, Raised by the first step AFTER a gate, proving the gate let the run through., _Sentinel

### Community 729 - "test_transient_upstream_failure_is_503_not_a_denial"
Cohesion: 0.67
Nodes (3): 5xx / 429 / transport from APS is indeterminate: no 403, no eviction of the…, test_transient_upstream_failure_is_503_not_a_denial(), _body()

### Community 730 - "test_ledger_executor_is_fifo"
Cohesion: 0.67
Nodes (3): Settlement scheduled after the turn's usage rows must run after them., test_ledger_executor_is_fifo(), main()

### Community 732 - "ready"
Cohesion: 0.67
Nodes (3): fixture, Both gateways READY. The readiness classification itself is covered by…, ready()

## Knowledge Gaps
- **26 isolated node(s):** `FieldSpec`, `_FakeClient`, `Schedule`, `Wave`, `ModelCapabilities` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 8218 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **218 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Firm` connect `Firm` to `main.py`, `ModelIndex`, `FirmDocument`, `hub_tenancy.py`, `world`, `test_slack_router.py`, `test_groups_views_404_oracle.py`, `test_teams_router.py`, `client_keys.py`, `get_store`, `UserRole`, `test_cross_firm_share_api.py`, `product_review_service.py`, `get_user_uuid`, `ProductRecord`, `assert_project_access`, `test_acc_role_sync.py`, `test_firm_onboarding.py`, `UserFirmMembership`, `ModelVersion`, `FirmAllowedHub`, `World`, `account_router.py`, `test_autodesk_first_cache_tier.py`, `db/models.py`, `admin_router.py`, `_scenario_harness.py`, `test_phase9_product_ingest_e2e.py`, `test_slack_pairing_db.py`, `UsageEvent`, `test_membership_draft_gating.py`, `test_autodesk_first_aps_share.py`, `test_model_budget_rollup.py`, `_check_once`, `ProjectHubCache`, `test_phase9_product_ingest_worker.py`, `test_change_set_router.py`, `teams/pairing.py`, `test_phase9_element_product_bindings.py`, `test_membership_lifecycle_cascade.py`, `make_leaf`, `admin_delegation_router.py`, `ProjectShareGrant`, `membership.py`, `test_change_set_lifecycle_events.py`, `test_lifecycle_dispatch.py`, `test_teams_pairing_db.py`, `test_pdp_g1_sdk_proxy_tenancy.py`, `test_budget_reservation_dblane.py`, `fixture`, `test_admin_auth.py`, `test_router.py`, `_fake_token`, `test_phase9_product_bindings_router.py`, `test_firm_docs_cka_authz_dblane.py`, `ClientBudget`, `test_scope_guards.py`, `ChangeSet`, `uuid`, `test_change_set_mutation_hardening.py`, `test_phase9_product_ingest_jobs_router.py`, `test_enrollment_endpoints.py`, `test_cache_reconcile.py`, `test_conversation_store.py`, `_sweep`, `test_lock_order_dblane.py`, `test_autodesk_first_workers.py`, `test_change_set_router_type_target.py`, `test_phase9_product_review_router.py`, `test_change_set_apply_boundary.py`, `exports.py`, `test_effective_access_migration.py`, `test_pdp_g1_proxy_tenancy.py`, `test_change_set_list_and_discard.py`, `test_firm_docs_routes_dblane.py`, `test_last_editor_lifecycle_paths_dblane.py`, `_login`, `TestClient`, `test_reclaim.py`, `test_groups_views_hub_isolation.py`, `test_assistant_nav_firm_scope_dblane.py`, `test_change_set_separate_approver_d2.py`, `test_grant_refused_on_inactive_firm.py`, `test_integrations_control_plane.py`, `test_phase9_refresh_integration.py`, `_seed_model_version`, `test_change_set_separate_approver_flag.py`, `test_firm_docs_upload_gaps_dblane.py`, `world`, `IntegrationRegistration`, `test_change_set_review_transitions.py`, `owner`, `test_groups_403_ordering.py`, `test_allowlist_subsystem_removed.py`, `test_row_locks_groups_change_sets.py`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `ModelIndex` connect `ModelIndex` to `main.py`, `test_shared_projects_carry_project_name_separate_from_label`, `aec/router.py`, `test_scenario_cross_firm_share.py`, `test_teams_pairing_db.py`, `UpstreamResponse`, `world`, `test_slack_router.py`, `test_teams_router.py`, `digest.py`, `get_or_refresh_category`, `assistant_context.py`, `share_authority.py`, `test_cross_firm_share_api.py`, `autodesk_first.py`, `test_assistant_nav_firm_scope_dblane.py`, `proxy_router.py`, `QaAnalysisRun`, `ModelVersion`, `test_effective_access_migration.py`, `db/models.py`, `_scenario_harness.py`, `cache_reconcile.py`, `test_slack_pairing_db.py`, `cross_model_join.py`, `test_model_index_discovery.py`, `fixture`, `test_autodesk_first_aps_share.py`, `test_autodesk_first_d1_all_grants.py`, `test_search_hub_isolation.py`, `test_artifacts_provenance.py`, `AecUpstreamError`, `test_support_fastpath.py`, `_Session`, `test_autodesk_first_read_paths.py`, `test_qa_history_capture_purge.py`, `test_artifact_producer.py`, `test_cache_reconcile.py`, `fixture`, `_sweep`, `cli_gate`, `ProjectShareGrant`, `test_shared_project_hub_id_consistent_with_shared_projects`, `fixture`, `_clean_rows`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `warm_room_geometry()` connect `test_geometry_decode.py` to `ModelVersion`, `RelationshipPrewarmJob`, `get_or_refresh_category`, `aec/client.py`, `test_schema_persist.py`, `test_geometry_fetch.py`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 128 inferred relationships involving `Firm` (e.g. with `account_me()` and `add_domain()`) actually correct?**
  _`Firm` has 128 INFERRED edges - model-reasoned connections that need verification._
- **Are the 115 inferred relationships involving `UserFirmMembership` (e.g. with `admin_revoke_member_api_key()` and `list_memberships()`) actually correct?**
  _`UserFirmMembership` has 115 INFERRED edges - model-reasoned connections that need verification._
- **Are the 97 inferred relationships involving `AccountAuditLog` (e.g. with `add_domain()` and `delete_domain()`) actually correct?**
  _`AccountAuditLog` has 97 INFERRED edges - model-reasoned connections that need verification._
- **Are the 84 inferred relationships involving `FirmAllowedHub` (e.g. with `_assert_firm_capability_for_hub()` and `assert_user_ceiling()`) actually correct?**
  _`FirmAllowedHub` has 84 INFERRED edges - model-reasoned connections that need verification._