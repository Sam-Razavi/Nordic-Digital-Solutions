"""create notification tables

Revision ID: 3a4f0c9d8e12
Revises: bd39249bd721
Create Date: 2026-05-24 00:00:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3a4f0c9d8e12"
down_revision: Union[str, Sequence[str], None] = "bd39249bd721"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create notification storage tables."""
    bind = op.get_bind()

    op.execute(
        """
        CREATE TABLE IF NOT EXISTS subscribers (
            user_id TEXT PRIMARY KEY,
            phone TEXT,
            email TEXT
        )
        """
    )
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS subscriber_sites (
            user_id TEXT NOT NULL,
            site_id TEXT NOT NULL,
            visited BOOLEAN NOT NULL DEFAULT FALSE,
            PRIMARY KEY (user_id, site_id),
            FOREIGN KEY (user_id) REFERENCES subscribers(user_id) ON DELETE CASCADE
        )
        """
    )
    columns = [
        column["name"]
        for column in sa.inspect(bind).get_columns("subscriber_sites")
    ]
    if "visited" not in columns:
        op.add_column(
            "subscriber_sites",
            sa.Column(
                "visited",
                sa.Boolean(),
                nullable=False,
                server_default=sa.false(),
            ),
        )
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS sent_log (
            user_id TEXT NOT NULL,
            site_id TEXT NOT NULL,
            channel TEXT NOT NULL,
            sent_at DOUBLE PRECISION NOT NULL,
            PRIMARY KEY (user_id, site_id, channel)
        )
        """
    )


def downgrade() -> None:
    """Drop notification storage tables."""
    op.drop_table("sent_log")
    op.drop_table("subscriber_sites")
    op.drop_table("subscribers")
